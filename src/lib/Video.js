import flatten from 'vendor/flatten'
import { observable, autorun } from "mobx"
import { token } from 'lib/actions'
import { computeTransitions } from 'lib/sceneWizard'
import transformBlock from 'lib/transformBlock'
import BlockPlayer from 'lib/BlockPlayer'

class Video {
  substitutions = {}
  scenesMeta = {}
  scenesBlocksMap = {}

  constructor() {
    this.blocksObjects = observable(new Map())
    this.scenesObjects = observable(new Map())

    autorun(() => {
      console.log('new blocksObjects', this.blocksObjects.size)
    })
  }

  addScenesMeta = (scenesMeta) => {
    this.scenesMeta = {...this.scenesMeta, ...scenesMeta}
  }

  addSubstitutions = (substitutions) => {
    this.substitutions = {...this.substitutions, ...substitutions}
  }

  addBlock = (block) => {
    if (block.id) { // this is a merge

    } else {
      block.id = `${block.type}_${token()}`
      block.player = new BlockPlayer({offset: block.offset})
    }

    // add or update the block object
    // TODO: add substitutions back in
    this.blocksObjects.set(block.id, observable(block))

    const scene = this.upsertScene(block.sceneId)

    // update the scene to include the block if new
    if (!scene.get('blocksIndex').includes(block.id)) {
      scene.get('blocksIndex').push(block.id)
    }

    // add the block to the scenesBlocksMap
    if (!this.scenesBlocksMap[block.sceneId]) {
      this.scenesBlocksMap[block.sceneId] = []
    }
    if (!this.scenesBlocksMap[block.sceneId].includes(block.id)) {
      this.scenesBlocksMap[block.sceneId] = this.scenesBlocksMap[block.sceneId].concat([block.id])
    }
  }

  upsertScene = (sceneId, attributes = {}) => {
    const meta = {
      ...(this.scenesMeta[sceneId] || {}),
      ...attributes,
    }
    let scene = this.scenesObjects.get(sceneId)
    if (!scene) {
      scene = new Map()
      scene.set('blocksIndex', [])
      scene.set('id', sceneId)
    }

    Object.keys(meta).forEach((key) => {
      scene.set(key, meta[key])
    })

    if (!this.scenesObjects.has(sceneId)) {
      this.scenesObjects.set(sceneId, scene)
    }

    return this.scenesObjects.get(sceneId)
  }

  editBlock = (blockId, attributes) => {
    Object.keys(attributes).forEach((key) => {
      this.blocksObjects.get(blockId)[key] = attributes[key]
    })
  }

  updateGraph = (graph) => {
    this.blockTransitions(graph).forEach((scene) => {
      const block = this.blocksObjects.get(scene.id)
      block.transitions = scene.transitions
    })

    this.sceneTransitions(graph).forEach((scene) => {
      this.upsertScene(scene.id, {transitions: scene.transitions})
    })
  }

  sceneTransitions = (graph) => {
    const transitionsMap = computeTransitions(graph)
    return (
      flatten(
        Object.keys(transitionsMap).map(sceneId => ({
          id: sceneId,
          transitions: transitionsMap[sceneId],
        }))
      , true)
    )
  }

  blockTransitions = (graph) => {
    const transitionsMap = computeTransitions(graph)
    return (
      flatten(
        Object.keys(transitionsMap).map(sceneId => (
          this.scenesBlocksMap[sceneId].map(id => ({
            id,
            transitions: transitionsMap[sceneId],
          }))
        ))
      , true)
    )
  }

  getBlocksInScene = sceneId => (
    this.getScene(sceneId).get('blocksIndex').map(id => this.getBlock(id))
  )

  getBlocks = () => Array.from(this.blocksObjects.keys()).map(id => this.getBlock(id))

  getBlock = id => this.blocksObjects.get(id)

  getScene = id => this.scenesObjects.get(id)

  getScenes = () => (
    Array.from(this.scenesObjects.keys()).map(sceneId => this.getScene(sceneId))
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
