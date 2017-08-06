import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import SlidesToCommands     from 'slides/lib/SlidesToCommands'
import Personalizer         from 'lib/Personalizer'

function Scenes(set, substitutions) {
  const PAUSE_BETWEEN_SCENES = 1000
  const personalizer = Personalizer(substitutions)
  let previousOffset = 0
  let previousDuration = 0

  const scenes = set.map((scene, index) => {
    switch(scene.type) {
      case "slides": {
        const personalizedData = (
          scene.data.map((slide) => {
            slide.data = personalizer.personalize(slide.data)
            return slide
          })
        )

        scene.player = CommandPlayer({sceneIndex: index, initialPayload: personalizedData})
        scene.player.reset(SlidesToCommands(personalizedData))
        scene.timeDuration = scene.player.timeDuration()
        break
      }
      case "editor": {
        scene.player = CommandPlayer()
        scene.player.reset(scene.data)
        scene.timeDuration = scene.player.timeDuration()
        break
      }
      case "texting": {
        scene.player = CommandPlayer()
        scene.player.reset(TextingToCommands(scene.data))
        scene.timeDuration = scene.player.timeDuration()
        break
      }
      case "quiz": {
        scene.data.question = personalizer.personalize(scene.data.question)
        scene.data.answers = (
          scene.data.answers.map((answer) => {
            answer.name = personalizer.personalize(answer.name)
            return answer
          })
        )

        scene.player = CommandPlayer()
        scene.player.reset([[0, scene.data]])
        scene.timeDuration = 1000 // the time it takes for "after select" animation
        break
      }
      default: {

      }
    }

    scene.index = index

    if (index === 0) {
      scene.timeOffset = 0
    } else {
      scene.timeOffset = previousOffset + previousDuration + PAUSE_BETWEEN_SCENES
    }

    previousDuration = scene.timeDuration
    previousOffset = scene.timeOffset

    return scene
  })

  const scenesReversed = scenes.slice(0).reverse()

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
      scenesReversed.find(scene => timePosition > scene.timeOffset)
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
