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
})

export default VideoPlayer
