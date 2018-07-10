const EditorState = videoPlayer => ({
  activePicker: null,
  isScenesMenuActive: null,
  isEditingText: null,

  // Show as the default menu
  get shouldShowBlocks() {
    return (
      !this.shouldShowPicker
        && !this.shouldShowBlockActions
        && !this.shouldShowSceneActions
    )
  },

  get shouldShowBlockActions() {
    return !!videoPlayer.block
  },

  get shouldShowPicker() {
    return !!this.activePicker
  },

  get shouldShowTextEditor() {
    return !!this.isEditingText
  },

  get shouldShowSceneActions() {
    return !!this.isScenesMenuActive
  },

  get shouldShowOverlay() {
    return (
      this.shouldShowPicker
        || this.shouldShowSceneActions
        || this.shouldShowBlockActions
    )
  },

  setPicker({toggle, type} = {}) {
    const value = toggle === 'close' ? false : !this.activePicker
    if (value) {
      this.activePicker = type
    } else {
      this.activePicker = false
    }
  },

  setScenesMenu(value) {
    this.isScenesMenuActive = value
  },

  setTextEditor(value) {
    this.isEditingText = value
  },

  clearLast() {
    if (this.isScenesMenuActive) {
      this.scenesMenuToggle()
    } else if (this.activePicker) {
      this.setPicker()
    } else {
      videoPlayer.unStageBlock()
    }
  },

  scenesMenuToggle() {
    this.setScenesMenu(!this.isScenesMenuActive)

    if (this.isScenesMenuActive) {
      videoPlayer.unStageBlock()
    } else {
      this.setPicker({toggle: 'close'})
    }
  },

  toggleTextEditor() {
    this.setTextEditor(!this.isEditingText)
  },
})

export default EditorState
