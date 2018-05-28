import flatten from 'vendor/flatten'
import { observable, autorun, toJS } from "mobx"
import { token } from 'lib/actions'
import { computeTransitions } from 'lib/sceneWizard'

const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
)

class Video {
  scenesMeta = {}
  graph = []

  constructor({scenesObjects, blocksObjects, graph, subscribe} = {}) {
    this.scenesObjects = observable(new Map())
    if (scenesObjects) {
      Object.keys(scenesObjects).forEach((key) => {
        this.upsertScene(key, scenesObjects[key])
      })
    }

    if (blocksObjects) {
      this.blocksObjects = observable(new Map(
        Object.keys(blocksObjects).map(key => (
          [
            key,
            observable.map(
              Object.keys(blocksObjects[key]).map(attributeName => (
                [
                  attributeName,
                  attributeName === 'lifecycle'
                    ? 'undefined'
                    : blocksObjects[key][attributeName]
                ]
              ))
            )
          ]
        ))
      ))
    } else {
      this.blocksObjects = observable(new Map())
    }

    if (graph) {
      this.updateGraph(graph)
    }

    autorun(() => {
      if (typeof subscribe === 'function') {
        subscribe({
          scenesObjects: toJS(this.scenesObjects),
          blocksObjects: toJS(this.blocksObjects),
          graph: this.graph,
        })
      }
    })
  }

  addBlock = (rawBlock) => {
    if (rawBlock.id) { // this is a merge

    } else {
      rawBlock.id = `${rawBlock.type}_${token()}`
    }

    const block = new Map(
      Object.keys(rawBlock).map(key => [key, rawBlock[key]])
    )

    // add or update the block object
    // TODO: add substitutions back in
    this.blocksObjects.set(block.get('id'), observable(block))

    const scene = this.upsertScene(block.get('sceneId'))

    // update the scene to include the block if new
    if (!scene.get('blocksIndex').includes(block.get('id'))) {
      scene.get('blocksIndex').push(block.get('id'))
    }

    return this.blocksObjects.get(block.get('id'))
  }

  removeBlock = (block) => {
    // update the scene to to remove the block
    const scene = this.getScene(block.get('sceneId'))
    const index = scene.get('blocksIndex').indexOf(block.get('id'))
    scene.get('blocksIndex').splice(index, 1)

    // remove the blockObject
    this.blocksObjects.delete(block.get('id'))
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
      scene.set('color_hsl', getRandomInt(0, 360))
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
      this.blocksObjects.get(blockId).set(key, attributes[key])
    })
  }

  // TODO POC
  // This is not a high integrity entry point for a scene O_o
  addScene = (afterSceneId) => {
    const sceneId = `scene_${token()}`

    if (afterSceneId) {
      const index = this.findSceneIndex(afterSceneId)
      this.graph.splice(index + 1, 0, sceneId)
    } else {
      this.graph.push(sceneId)
    }

    this.updateGraph(this.graph)

    return sceneId
  }

  findSceneIndex = sceneId => (
    this.graph.findIndex(node => (
      node === sceneId
      || ((typeof node === 'object') && Object.keys(node)[0] === sceneId)
    ))
  )

  updateGraph = (graph) => {
    this.graph = graph
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
      this.getScenes().find(scene => !scene.get('transitions') || !scene.get('transitions').prev)
    )

    if (initialScene) {
      return initialScene.get('id')
    }
  }

  timeDuration = () => (
    this.getBlocks().reduce((memo, block) => (memo + block.get('timeDuration')), 0)
  )

  getScenePosition = sceneId => (
    this.findSceneIndex(sceneId) + 1
  )
}

export default Video
