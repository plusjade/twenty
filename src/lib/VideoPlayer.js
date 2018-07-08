import randomEmoji from 'db/randomEmoji'

const VideoPlayer = (video, activeSceneId) => ({
  initialSceneId: activeSceneId,
  activeSceneId: activeSceneId,

  get activeScene() {
    return video.getScene(this.activeSceneId)
  },

  get activeBlocks() {
    return video.getBlocksInScene(this.activeSceneId) || []
  },

  get activeScenePosition() {
    return video.getScenePosition(this.activeSceneId)
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
    return this.activeScene.get('transitions')
  },

  addScene() {
    const sceneId = video.addScene(this.activeSceneId)
    this.setActiveSceneId(sceneId)
  },

  addBlock(type = 'words') {
    const block = video.addBlock({
      type,
      content: `${randomEmoji()} HEADING`,
      sceneId: this.activeSceneId,
    })
    this.stageBlock(block.get('id'))
    setTimeout(() => {
      block.set('lifecycle', 'play')
    }, 100) // TODO FIXME
  },

  editBlockActive(attributes) {
    video.editBlock(this.blockId, attributes)
  },

  removeBlockActive() {
    if (!this.blockId) { return }
    this.removeBlock(this.blockId)
  },

  removeBlock(blockId) {
    this.unStageBlock({replay: false})
    const block = video.getBlock(blockId)
    video.removeBlock(block)
  },

  blockId: null,

  get block() {
    return this.blockId ? video.getBlock(this.blockId) : null
  },

  stageBlock(blockId) {
    if (blockId === this.blockId) {
      this.unStageBlock()
    } else {
      this.unStageBlock({
        callback: () => {
          this.blockId = blockId
          video.getBlock(blockId).set('lifecycle', 'edit')
        }
      })
    }
  },

  unStageBlock({callback, replay} = {}) {
    if (!this.blockId) {
      if (callback) { callback() }
      return
    }

    const blockId = this.blockId
    this.blockId = null // may have to wait for a little?
    if (replay) {
      video.getBlock(blockId).set('lifecycle', 'replay')
    } else {
      const block = video.getBlock(blockId)
      if (block) {
        block.set('lifecycle', 'end')
      }
    }
    if (callback) { callback() }
  },

  color(value) {
    return (
      this.block
        ? this.colorBlock(value)
        : this.colorScene(value)
    )
  },

  colorBlock(value) {
    return (
      value
        ? this.changeColorBlock(value)
        : this.getColorBlock()
    )
  },

  colorScene(value) {
    return (
      value
        ? this.changeColorScene(value)
        : this.getColorScene()
    )
  },

  getColorBlock() {
    const defaultColor = -100
    if (!this.block) { return defaultColor }
    const color = this.block.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  },

  getColorScene() {
    const defaultColor = -100
    if (!this.activeScene) { return defaultColor }
    const color = this.activeScene.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  },

  changeColorBlock(value) {
    if (!this.block) { return }
    this.block.set('color_hsl', value)
  },

  changeColorScene(value) {
    if (!this.activeScene) { return }
    this.activeScene.set('color_hsl', value)
  },

  align(value) {
    if (value) {
      return this.changeAlign(value)
    } else {
      return null // TODO
    }
  },

  changeAlign(value) {
    if (!this.block) { return }
    this.block.set('align', value)
    this.block.set('lifecycle', 'replay')
  },

  size(value) {
    if (value) {
      return this.changeSize(value)
    } else {
      return this.sizeBlock()
    }
  },

  changeSize(value) {
    if (!this.block) { return }
    this.block.set('size', value)
  },

  sizeBlock() {
    const defaultValue = 80
    if (!this.block) { return defaultValue }
    const value = this.block.get('size') || defaultValue
    if (!value) { return defaultValue }

    return value
  },

  computeKey(scope) {
    return (
      scope + (
        this.block
          ? this.block.get('id')
          : this.activeSceneId
      )
    )
  },
})

export default VideoPlayer
