import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import WordsToCommands      from 'words/lib/WordsToCommands'
import Personalizer         from 'lib/Personalizer'

import WordsBot             from 'words/lib/WordsBot'
import QuizBot from 'quiz/lib/QuizBot'

const botsMap = {
  words: WordsBot,
  quiz: QuizBot,
}


function Scenes(set, substitutions) {
  const personalizer = Personalizer(substitutions)
  let previousOffset = 0
  let previousDuration = 0

  const wordsTransform = (scene, index) => {
    const personalizedData = (
      scene.data.map(entry => ({
        ...entry, data: personalizer.personalize(entry.data)
      }))
    )
    const result = WordsToCommands(personalizedData, scene.in)
    scene.payload = result
    scene.player = CommandPlayer({sceneIndex: index, initialPayload: personalizedData})
    scene.player.reset(result)
    scene.timeDuration = scene.player.timeDuration() + (scene.out || 0)

    return scene
  }

  const scenes = set.map((scene, index) => {
    switch(scene.type) {
      case "words": {
        wordsTransform(scene, index)
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

        scene.payload = payload
        scene.player = CommandPlayer({sceneIndex: index, initialPayload: payload})
        scene.player.reset([]) // no commands
        scene.timeDuration = 1000 // the time it takes for "after select" animation
        break
      }
      default: {

      }
    }


    if (botsMap[scene.type]) {
      scene.player.mount(botsMap[scene.type]())
    }

    scene.index = index
    scene.id = `${index}_${scene.type}`

    if (index === 0) {
      scene.timeOffset = 0
    } else {
      scene.timeOffset = previousOffset + previousDuration
    }

    previousDuration = scene.timeDuration
    previousOffset = scene.timeOffset

    return scene
  })

  const thingsObjects = scenes.reduce((memo, scene) => {
    memo[scene.id] = scene
    return memo
  }, {})

  const scenesObjectsMap = scenes.reduce((memo, scene) => {
    if (memo[scene.parentSceneId]) {
      memo[scene.parentSceneId].push(scene.id)
    } else {
      memo[scene.parentSceneId] = [scene.id]
    }
    return memo
  }, {})

  const scenesList = Object.keys(scenesObjectsMap).sort()

  const scenesObjects = scenesList.reduce((memo, id) => {
    const thingsIds = scenesObjectsMap[id]
    memo[id] = {
      id,
      thingsIds,
      bg: thingsObjects[thingsIds[0]].bg
    }
    return memo
  }, {})

  const scenesReversed = scenes.slice(0).reverse()

  function timeDuration() {
    return (
      scenesReversed[0].timeOffset + scenesReversed[0].timeDuration
    )
  }

  function at(timePosition) {
    const scene = find(timePosition)
    if (scene) {
      return ({
        ...scene,
        offsetTimePosition: timePosition - scene.timeOffset,
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

  const getThings = sceneId => (
    getScene(sceneId).thingsIds.map(id => getThing(id))
  )

  const getThing = id => thingsObjects[id]
  const getScene = id => scenesObjects[id]

  const getScenes = () => (
    scenesList.map(sceneId => getScene(sceneId))
  )

  return ({
    scenesList,
    scenesObjects,
    thingsObjects,
    getThings,
    getScene,
    getScenes,
    at,
    timeDuration,
  })
}


export default Scenes
