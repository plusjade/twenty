import flatten from 'vendor/flatten'
import { observable, autorun, toJS } from "mobx"
import { token } from 'lib/actions'
import { DateTime } from 'luxon'
import { computeTransitions } from 'lib/sceneWizard'
import Scene from 'models/Scene'

class Video {
  graph = []
  id = null

  constructor({id, scenesObjects, blocksObjects, graph, subscribe} = {}) {
    this.id = id
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

    autorun(() => {
      if (typeof subscribe === 'function') {
        const scenesObjects = {}
        this.scenesObjects.forEach((scene) => {
          scenesObjects[scene.id] = scene.serialized
        })
        subscribe({
          scenesObjects,
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
    scene.addBlockRef(block.get('id'))

    return this.blocksObjects.get(block.get('id'))
  }

  removeBlock = (block) => {
    // update the scene to to remove the block
    const scene = this.getScene(block.get('sceneId'))
    scene.removeBlockRef(block.get('id'))

    // remove the blockObject
    this.blocksObjects.delete(block.get('id'))
  }

  upsertScene = (sceneId, attributes = {}) => {
    let scene = this.scenesObjects.get(sceneId)
    if (scene) {
      if (attributes.transitions) {
        scene.setTransitions(attributes.transitions)
      }
    } else {
      scene = observable(Scene({...attributes, id: sceneId}))
    }

    if (!this.scenesObjects.has(sceneId)) {
      this.scenesObjects.set(sceneId, scene)
    }

    return this.scenesObjects.get(sceneId)
  }

  addScene = (dateId) => {
    const sceneId = `scene_${dateId}`
    this.upsertScene(sceneId) // {transitions: scene.transitions}
    return sceneId
  }

  findSceneIndex = sceneId => (
    this.graph.findIndex(node => (
      node === sceneId
      || ((typeof node === 'object') && Object.keys(node)[0] === sceneId)
    ))
  )

  getBlocksInScene = sceneId => (
    this.getScene(sceneId).blocksIndex.map(id => this.getBlock(id))
  )

  getBlocks = () => Array.from(this.blocksObjects.keys()).map(id => this.getBlock(id))

  getBlock = id => this.blocksObjects.get(id)

  getScene = id => this.scenesObjects.get(id)

  getScenes = () => {
    const newObjects = this.scenesObjects.keys() // hack to make this function observed

    const anchor = DateTime.local().minus({days: 7})
    return (
      new Array(14).fill(null).map((_, i) => {
        const dateId = anchor.plus({days: i}).toLocaleString()
        const sceneId = `scene_${dateId}`

        return this.getScene(sceneId)
      })
    )
  }

  getInitialSceneId = () => {
    return null
  }

  getScenePosition = sceneId => (
    this.findSceneIndex(sceneId) + 1
  )
}

export default Video
