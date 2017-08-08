import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import SlidesToCommands     from 'slides/lib/SlidesToCommands'
import Personalizer         from 'lib/Personalizer'

function Scenes(set, substitutions) {
  const personalizer = Personalizer(substitutions)
  let previousOffset = 0
  let previousDuration = 0

  const scenes = set.map((scene, index) => {
    switch(scene.type) {
      case "slides": {
        const personalizedData = (
          scene.data.map(slide => (
            Object.assign(slide, {data: personalizer.personalize(slide.data)})
          ))
        )

        scene.player = CommandPlayer({sceneIndex: index, initialPayload: personalizedData})
        scene.player.reset(SlidesToCommands(personalizedData, scene.in))
        scene.timeDuration = scene.player.timeDuration() + (scene.out || 0)
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
        const payload = {
          question: personalizer.personalize(scene.data.question),
          answers: (
            scene.data.answers.map(answer => (
              Object.assign(answer, {name: personalizer.personalize(answer.name)})
            ))
          )
        }

        scene.player = CommandPlayer({sceneIndex: index, initialPayload: payload})
        scene.player.reset([]) // no commands
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
      scene.timeOffset = previousOffset + previousDuration
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
