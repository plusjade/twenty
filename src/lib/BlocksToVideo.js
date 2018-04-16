import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import WordsToCommands      from 'words/lib/WordsToCommands'
import Personalizer         from 'lib/Personalizer'

export default function BlocksToVideo(rawBlocks, substitutions) {
  const personalizer = Personalizer(substitutions)
  let previousOffset = 0
  let previousDuration = 0

  const blocks = rawBlocks.map((block, index) => {
    block.id = `${index}_${block.type}`

    switch(block.type) {
      case "words": {
        const personalizedData = (
          block.data.map(entry => ({
            ...entry,
            data: personalizer.personalize(entry.data)
          }))
        )
        const rawCommands = WordsToCommands(personalizedData, block.in)
        block.initialPayload = personalizedData
        block.player = CommandPlayer({
          initialPayload: personalizedData,
          rawCommands,
        })
        block.timeDuration = block.player.timeDuration() + (block.out || 0)

        break
      }
      case "quiz": {
        const payload = {
          question: personalizer.personalize(block.data.question),
          answers: (
            block.data.answers.map(answer => (
              Object.assign(answer, {name: personalizer.personalize(answer.name)})
            ))
          )
        }
        block.initialPayload = payload
        block.player = CommandPlayer({
          initialPayload: payload,
          rawCommands: [],
        })
        block.timeDuration = 1000 // the time it takes for "after select" animation
        break
      }
      case "editor": {
        block.player = CommandPlayer({
          rawCommands: block.data
        })
        block.timeDuration = block.player.timeDuration()
        break
      }
      case "texting": {
        const rawCommands = TextingToCommands(block.data)
        block.player = CommandPlayer({
          rawCommands,
        })
        block.timeDuration = block.player.timeDuration()
        break
      }
      default: {
        // noop
      }
    }

    if (index === 0) {
      block.timeOffset = 0
    } else {
      block.timeOffset = previousOffset + previousDuration
    }

    previousDuration = block.timeDuration
    previousOffset = block.timeOffset

    return block
  })

  const blocksObjects = blocks.reduce((memo, block) => {
    memo[block.id] = block
    return memo
  }, {})

  const scenesObjectsMap = blocks.reduce((memo, block) => {
    if (memo[block.sceneId]) {
      memo[block.sceneId].push(block.id)
    } else {
      memo[block.sceneId] = [block.id]
    }
    return memo
  }, {})

  const scenesList = Object.keys(scenesObjectsMap).sort()

  const scenesObjects = scenesList.reduce((memo, id) => {
    const blocksIds = scenesObjectsMap[id]
    memo[id] = {
      id,
      blocksIds,
      bg: blocksObjects[blocksIds[0]].bg
    }
    return memo
  }, {})

  const blocksReversed = blocks.slice(0).reverse()

  const timeDuration = () => (
    blocksReversed[0].timeOffset + blocksReversed[0].timeDuration
  )

  function blockAtTime(timePosition) {
    const block = find(timePosition)
    if (block) {
      return ({
        ...block,
        offsetTimePosition: timePosition - block.timeOffset,
      })
    } else {
      throw new RangeError(`No block found at ${timePosition}`)
    }
  }

  const find = (timePosition) => (
    blocksReversed.find(block => timePosition > block.timeOffset)
  )

  const getBlocksInScene = sceneId => (
    getScene(sceneId).blocksIds.map(id => getBlock(id))
  )

  const getBlocks = () => Object.keys(blocksObjects).map(id => getBlock(id))

  const getBlock = id => blocksObjects[id]

  const getScene = id => scenesObjects[id]

  const getScenes = () => (
    scenesList.map(sceneId => getScene(sceneId))
  )

  return ({
    blockAtTime,
    blocksObjects, // for debugging, shouldn't need to access
    getBlocksInScene,
    getBlocks,
    getScene,
    getScenes,
    scenesList, // for debugging, shouldn't need to access
    scenesObjects, // for debugging, shouldn't need to access
    timeDuration,
  })
}
