import { token } from 'lib/actions'
import { transformGraph } from 'lib/sceneWizard'
import transformBlock from 'lib/transformBlock'

class Video {
  blocksObjects = {}
  scenesObjects = {}
  substitutions = {}
  scenesMeta = {}
  scenesMap = {}

  addScenesMeta = (scenesMeta) => {
    this.scenesMeta = {...this.scenesMeta, ...scenesMeta}
  }

  addSubstitutions = (substitutions) => {
    this.substitutions = {...this.substitutions, ...substitutions}
  }

  addBlock = (block) => {
    const scenesObject = this.scenesObjects[block.sceneId] || {blocksIndex: []}
    block.id = `${block.type}_${token()}`

    this.blocksObjects[block.id] = transformBlock({block, substitutions: this.substitutions})

    this.scenesObjects[block.sceneId] = {
      ...(this.scenesMeta[block.sceneId] || {}),
      id: block.sceneId,
      blocksIndex: scenesObject.blocksIndex.concat([block.id]),
    }

    if (!this.scenesMap[block.sceneId]) {
      this.scenesMap[block.sceneId] = []
    }

    this.scenesMap[block.sceneId] = this.scenesMap[block.sceneId].concat([block.id])
  }

  updateGraph = (graph) => {
    const blocks = transformGraph({graph, scenesMap: this.scenesMap})
    blocks.forEach((block) => {
      this.blocksObjects[block.id].transitions = block.transitions
    })
  }

  getBlocksInScene = sceneId => (
    this.getScene(sceneId).blocksIndex.map(id => this.getBlock(id))
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
