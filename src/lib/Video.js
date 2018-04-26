import transformBlock from 'lib/transformBlock'

class Video {
  blocksObjects = {}
  scenesObjects = {}
  substitutions = {}

  constructor({blocks, substitutions, scenesMeta}) {
    this.substitutions = substitutions

    const scenesObjectsMap = blocks.reduce((memo, block) => {
      if (memo[block.sceneId]) {
        memo[block.sceneId].push(block.id)
      } else {
        memo[block.sceneId] = [block.id]
      }
      return memo
    }, {})

    Object.keys(scenesObjectsMap).forEach((id) => {
      this.scenesObjects[id] = {
        ...(scenesMeta[id] || {}),
        id,
        blocksIds: scenesObjectsMap[id],
      }
    })

    blocks.forEach(this.updateBlock)
  }

  timeDuration = () => (
    this.getBlocks().reduce((memo, block) => (memo + block.timeDuration), 0)
  )

  updateBlock = (block) => {
    this.blocksObjects[block.id] = transformBlock({block, substitutions: this.substitutions})
  }

  getBlocksInScene = sceneId => (
    this.getScene(sceneId).blocksIds.map(id => this.getBlock(id))
  )

  getBlocks = () => Object.keys(this.blocksObjects).map(id => this.getBlock(id))

  getBlock = id => this.blocksObjects[id]

  getScene = id => this.scenesObjects[id]

  getScenes = () => (
    Object.keys(this.scenesObjects).map(sceneId => this.getScene(sceneId))
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
