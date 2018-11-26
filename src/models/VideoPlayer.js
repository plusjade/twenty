import { dateId } from 'lib/actions'
import BlocksRegistry from 'models/BlocksRegistry'

const VideoPlayer = (video, activeSceneId, canEdit) => ({
  canEdit: !!canEdit,
  initialSceneId: activeSceneId,
  activeSceneId: null,
  dimensionsWidth: 111,
  dimensionsHeight: 111,
  orientation: 'portrait',

  // assume this is a square
  // so we only care about one dimension based on orientation
  setDimensions({orientation, width, height}) {
    const dimensionsWidth = orientation === 'portrait' ? width : height
    this.dimensionsWidth = dimensionsWidth
    this.dimensionsHeight = dimensionsWidth
    this.orientation = orientation
  },

  get dimensions() {
    return ({
      width: this.dimensionsWidth,
      height: this.dimensionsHeight,
      orientation: this.orientation,
    })
  },

  get isLandscape() {
    return this.orientation === 'landscape'
  },

  get activeScene() {
    return video.getScene(this.activeSceneId)
  },

  get activeScenePosition() {
    return video.getScenePosition(this.activeSceneId)
  },

  scenePosition(sceneId) {
    return video.getScenePosition(sceneId)
  },

  get isInitialScene() {
    return this.activeSceneId === this.initialSceneId
  },

  setActiveSceneId(sceneId) {
    this.activeSceneId = sceneId
  },

  sceneTransition(data = {}) {
    const {option, ...props} = data
    const sceneTransitions = this.derivedSceneTransitions()
    let nextScene

    if (option) {
      const candidateScene = sceneTransitions[option]
      if (video.getScene(candidateScene)) {
        nextScene = candidateScene
      } else if (option === 'prev' && this.isInitialScene) {
        // do nothing
      } else if (video.getScene(sceneTransitions.next)) {
        nextScene = sceneTransitions.next
      }
    } else if (video.getScene(sceneTransitions.next)) {
      nextScene = sceneTransitions.next
    }

    if (nextScene) {
      this.setActiveSceneId(nextScene)
    } else {
      // throw new Error('nowhere to go')
      console.error('nowhere to go')
    }
  },

  // Find the module in the current step that has the step_transition metadata
  derivedSceneTransitions() {
    return this.activeScene.transitions
  },

  addBlock(type) {
    const defaults = BlocksRegistry.defaults(type)
    const block = video.addBlock({
      ...defaults,
      type,
      sceneId: this.activeSceneId,
    })
    this.stageBlock(block.get('id'))
  },

  removeBlockActive() {
    const block = this.block
    if (!block) { return }
    this.unStageBlock()
    video.removeBlock(block)
  },

  blockId: null,

  get block() {
    return this.blockId ? video.getBlock(this.blockId) : null
  },

  stageBlock(blockId) {
    if (!this.canEdit) { return }

    if (blockId === this.blockId) {
      this.unStageBlock()
    } else {
      this.unStageBlock({
        callback: () => {
          this.blockId = blockId
        }
      })
    }
  },

  unStageBlock({callback} = {}) {
    if (!this.canEdit) { return }
    if (!this.blockId) {
      if (callback) { callback() }
      return
    }

    this.blockId = null // may have to wait for a little?
    if (callback) { callback() }
  },

  addScene(scene) {
    const nextDate = new Date().setTime(scene.dateObject.getTime() + 86400000)
    const nextDateId = dateId(nextDate)
    const hasDate = video.getScenes().some(scene => scene.dateId === nextDateId)
    if (!hasDate) {
      const sceneId = video.addScene(scene.id)
      video.getScene(sceneId).setDate(nextDate)

      const types = ['tag','list']
      types.forEach((type) => {
        const defaults = BlocksRegistry.defaults(type)
        video.addBlock({
          ...defaults,
          type,
          sceneId,
        })
      })
    }
  },
})

export default VideoPlayer
