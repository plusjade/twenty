import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import WordsToCommands      from 'words/lib/WordsToCommands'
import Personalizer         from 'lib/Personalizer'

export default function Things(set, substitutions) {
  const personalizer = Personalizer(substitutions)
  let previousOffset = 0
  let previousDuration = 0

  const things = set.map((thing, index) => {
    thing.id = `${index}_${thing.type}`

    switch(thing.type) {
      case "words": {
        const personalizedData = (
          thing.data.map(entry => ({
            ...entry,
            data: personalizer.personalize(entry.data)
          }))
        )
        const rawCommands = WordsToCommands(personalizedData, thing.in)
        thing.player = CommandPlayer({
          initialPayload: personalizedData,
          rawCommands,
        })
        thing.timeDuration = thing.player.timeDuration() + (thing.out || 0)

        break
      }
      case "quiz": {
        const payload = {
          question: personalizer.personalize(thing.data.question),
          answers: (
            thing.data.answers.map(answer => (
              Object.assign(answer, {name: personalizer.personalize(answer.name)})
            ))
          )
        }

        thing.player = CommandPlayer({
          initialPayload: payload,
          rawCommands: [],
        })
        thing.timeDuration = 1000 // the time it takes for "after select" animation
        break
      }
      case "editor": {
        thing.player = CommandPlayer({
          rawCommands: thing.data
        })
        thing.timeDuration = thing.player.timeDuration()
        break
      }
      case "texting": {
        const rawCommands = TextingToCommands(thing.data)
        thing.player = CommandPlayer({
          rawCommands,
        })
        thing.timeDuration = thing.player.timeDuration()
        break
      }
      default: {
        // noop
      }
    }

    if (index === 0) {
      thing.timeOffset = 0
    } else {
      thing.timeOffset = previousOffset + previousDuration
    }

    previousDuration = thing.timeDuration
    previousOffset = thing.timeOffset

    return thing
  })

  const thingsObjects = things.reduce((memo, thing) => {
    memo[thing.id] = thing
    return memo
  }, {})

  const scenesObjectsMap = things.reduce((memo, thing) => {
    if (memo[thing.sceneId]) {
      memo[thing.sceneId].push(thing.id)
    } else {
      memo[thing.sceneId] = [thing.id]
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

  const thingsReversed = things.slice(0).reverse()

  const timeDuration = () => (
    thingsReversed[0].timeOffset + thingsReversed[0].timeDuration
  )

  function at(timePosition) {
    const thing = find(timePosition)
    if (thing) {
      return ({
        ...thing,
        offsetTimePosition: timePosition - thing.timeOffset,
      })
    } else {
      throw new RangeError(`No thing found at ${timePosition}`)
    }
  }

  const find = (timePosition) => (
    thingsReversed.find(thing => timePosition > thing.timeOffset)
  )

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
