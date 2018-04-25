
const computeVideo = (blocks, scenesMeta) => {
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

  const scenesList = Object.keys(scenesObjectsMap)

  const scenesObjects = scenesList.reduce((memo, id) => {
    const blocksIds = scenesObjectsMap[id]
    memo[id] = {
      ...(scenesMeta[id] || {}),
      id,
      blocksIds,
    }
    return memo
  }, {})

  const blocksReversed = blocks.slice(0).reverse()

  const timeDuration = () => (
    // blocksReversed[0].timeOffset + blocksReversed[0].timeDuration
    blocks.reduce((memo, block) => (memo + block.timeDuration), 0)
  )

  function blockAtTime(timePosition, sceneId) {
    const block = find(timePosition, sceneId)
    if (block) {
      return ({
        ...block,
        offsetTimePosition: timePosition - block.timeOffset,
      })
    } else {
      // throw new RangeError(`No block found at ${timePosition}`)
    }
  }

  const blocksAtScene = (sceneId) => {
    return blocks.filter(block => sceneId === block.sceneId)
  }

  const find = (timePosition, sceneId) => {
    // console.log(sceneId)
    return blocksReversed.find(block => {
      // return timePosition > block.timeOffset

      if (sceneId) {
        return sceneId == block.sceneId && timePosition > block.timeOffset
      } else {
        return timePosition > block.timeOffset
      }
    })
  }

  const getBlocksInScene = sceneId => (
    getScene(sceneId).blocksIds.map(id => getBlock(id))
  )

  const getBlocks = () => Object.keys(blocksObjects).map(id => getBlock(id))

  const getBlock = id => blocksObjects[id]

  const getScene = id => scenesObjects[id]

  const getScenes = () => (
    scenesList.map(sceneId => getScene(sceneId))
  )

  const getInitialSceneId = () => {
    const initialScene = (
      getBlocks().find(block => !block.transitions || !block.transitions.prev)
    )
    if (initialScene) {
      return initialScene.sceneId
    }
  }

  return ({
    getInitialSceneId,
    blockAtTime,
    blocksAtScene,
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

export default computeVideo
