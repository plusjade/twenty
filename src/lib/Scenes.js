import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import SlidesToCommands     from 'slides/lib/SlidesToCommands'
import Personalizer         from 'lib/Personalizer'

function Scenes(set, substitutions) {
  const PAUSE_BETWEEN_SCENES = 1000
  const personalizer = Personalizer(substitutions)
  let time = 0

  const scenes = set.map((p, index) => {
    switch(p.type) {
      case "slides": {
        const personalizedData = (
          p.data.map((slide) => {
            slide.data = personalizer.personalize(slide.data)
            return slide
          })
        )

        p.player = CommandPlayer()
        p.player.reset(SlidesToCommands(personalizedData))
        p.timeDuration = p.player.timeDuration()
        break
      }
      case "editor": {
        p.player = CommandPlayer()
        p.player.reset(p.data)
        p.timeDuration = p.player.timeDuration()
        break
      }
      case "texting": {
        p.player = CommandPlayer()
        p.player.reset(TextingToCommands(p.data))
        p.timeDuration = p.player.timeDuration()
        break
      }
      case "quiz": {
        p.data.question = personalizer.personalize(p.data.question)
        p.data.answers = (
          p.data.answers.map((answer) => {
            answer.name = personalizer.personalize(answer.name)
            return answer
          })
        )

        p.player = CommandPlayer()
        p.player.reset([[0, p.data]])
        p.timeDuration = 1000 // the time it takes for "after select" animation
        break
      }
      default: {

      }
    }

    p.index = index
    p.timeOffset = time + (index > 0 ? PAUSE_BETWEEN_SCENES : 0)
    time += p.timeDuration

    return p
  })
  const scenesReversed = scenes.slice(0).reverse()

  console.log(scenes)

  function timeDuration() {
    return (
      scenesReversed[0].timeOffset + scenesReversed[0].timeDuration
    )
  }

  function mount(type, bot) {
    scenes.forEach((scene) => {
      if (scene.type === type) {
        scene.player.mount(bot)
      }
    })
  }

  function at(timePosition) {
    const scene = find(timePosition)
    if (scene) {
      return ({
        timeDuration: scene.timeDuration,
        type: scene.type,
        index: scene.index,
        timeOffset: scene.timeOffset,
        offsetTimePosition: timePosition - scene.timeOffset,
        player: scene.player,
      })
    } else {
      throw new RangeError(`No scene found at ${timePosition}`)
    }
  }

  function find(timePosition) {
    return (
      scenesReversed.find(p => timePosition > p.timeOffset)
    )
  }

  function types() {
    return scenes.map(scene => scene.type)
  }

  return ({
    at: at,
    mount: mount,
    timeDuration: timeDuration,
    types: types,
  })
}


export default Scenes
