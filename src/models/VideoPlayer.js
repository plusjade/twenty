import { dateId } from 'lib/actions'
import BlocksRegistry from 'models/BlocksRegistry'
import { DateTime } from 'luxon'

const VideoPlayer = (video, activeSceneId, canEdit) => ({
  video,
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

  addScene(date) {
    const sceneId = video.addScene(date.toLocaleString())
    const scene = video.getScene(sceneId)
    scene.setDate(date.toJSDate())
    const types = ['tag','list']
    types.forEach((type) => {
      const defaults = BlocksRegistry.defaults(type)
      video.addBlock({
        ...defaults,
        type,
        sceneId,
      })
    })
  },

  get dates() {
    const anchor = DateTime.local().minus({days: 28})
    return (
      new Array(35).fill(null).map((_, i) => {
        const d = anchor.plus({days: i})
        const dateId = d.toLocaleString()
        const sceneId = `scene_${dateId}`
        const scene = video.getScene(sceneId)
        return ({
          date: d,
          dateId,
          scene,
          dateString: d.toLocaleString({
            // weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        })
      })
    )
  }
})

export default VideoPlayer
