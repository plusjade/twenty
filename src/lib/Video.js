import transformBlocks from 'lib/transformBlocks'

class Video {
  constructor({blocks, substitutions, scenesMeta}) {
    this.blocks = transformBlocks({blocks, substitutions})

    this.blocksObjects = this.blocks.reduce((memo, block) => {
      memo[block.id] = block
      return memo
    }, {})

    this.scenesObjectsMap = this.blocks.reduce((memo, block) => {
      if (memo[block.sceneId]) {
        memo[block.sceneId].push(block.id)
      } else {
        memo[block.sceneId] = [block.id]
      }
      return memo
    }, {})

    this.scenesList = Object.keys(this.scenesObjectsMap)

    this.scenesObjects = this.scenesList.reduce((memo, id) => {
      const blocksIds = this.scenesObjectsMap[id]
      memo[id] = {
        ...(scenesMeta[id] || {}),
        id,
        blocksIds,
      }
      return memo
    }, {})
  }

  timeDuration = () => (
    this.blocks.reduce((memo, block) => (memo + block.timeDuration), 0)
  )

  blocksAtScene = sceneId => (
    this.blocks.filter(block => sceneId === block.sceneId)
  )

  getBlocksInScene = sceneId => (
    this.getScene(sceneId).blocksIds.map(id => this.getBlock(id))
  )

  getBlocks = () => Object.keys(this.blocksObjects).map(id => this.getBlock(id))

  getBlock = id => this.blocksObjects[id]

  getScene = id => this.scenesObjects[id]

  getScenes = () => (
    this.scenesList.map(sceneId => this.getScene(sceneId))
  )

  getInitialSceneId = () => {
    const initialScene = (
      this.getBlocks().find(block => !block.transitions || !block.transitions.prev)
    )
    if (initialScene) {
      return initialScene.sceneId
    }
  }
}

export default Video
