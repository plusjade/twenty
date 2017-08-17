import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import WordsToCommands      from 'words/lib/WordsToCommands'
import Personalizer         from 'lib/Personalizer'

function Scenes(set, substitutions) {
  const personalizer = Personalizer(substitutions)
  let previousOffset = 0
  let previousDuration = 0

  const scenes = set.map((scene, index) => {
    switch(scene.type) {
      case "words": {
        const personalizedData = (
          scene.data.map(entry => (
            Object.assign(entry, {data: personalizer.personalize(entry.data)})
          ))
        )

        scene.player = CommandPlayer({sceneIndex: index, initialPayload: personalizedData})
        scene.player.reset(WordsToCommands(personalizedData, scene.in))
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

  // have to mount individual bot instances
  function mount(type, bot, index) {
    scenes[index].player.mount(bot)
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
