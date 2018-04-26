import transformBlock from 'lib/transformBlock'

class Video {
  blocksObjects = {}
  scenesObjects = {}
  substitutions = {}
  scenesMeta = {}

  addScenesMeta = (scenesMeta) => {
    this.scenesMeta = {...this.scenesMeta, ...scenesMeta}
  }

  addSubstitutions = (substitutions) => {
    this.substitutions = {...this.substitutions, ...substitutions}
  }

  addBlock = (block) => {
    const scenesObject = this.scenesObjects[block.sceneId] || {blocksIds: []}
    this.blocksObjects[block.id] = transformBlock({block, substitutions: this.substitutions})
    this.scenesObjects[block.sceneId] = {
      ...(this.scenesMeta[block.sceneId] || {}),
      id: block.sceneId,
      blocksIds: scenesObject.blocksIds.concat([block.id]),
    }
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

  timeDuration = () => (
    this.getBlocks().reduce((memo, block) => (memo + block.timeDuration), 0)
  )
}

export default Video
