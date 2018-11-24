import BlocksRegistry from 'models/BlocksRegistry'

const pickerTypes = [
  {
    type: 'text',
    name: 'text',
    emoji: '✍️',
  },
  {
    type: 'color',
    name: 'color',
    emoji: '🎨',
  },
  {
    type: 'align',
    name: 'align',
    emoji: '⇆',
  },
  {
    type: 'size',
    name: 'size',
    emoji: 'A',
  },
  {
    type: 'delete',
    name: 'DELETE',
    emoji: '😵',
  },
]

const EditorState = videoPlayer => ({
  activePicker: false,
  isScenesMenuActive: null,

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

  get activePickers() {
    if (!videoPlayer.block) { return ([]) }
    const pickers = BlocksRegistry.getMeta(videoPlayer.block.get('type')).pickers || []

    return pickerTypes.filter(picker => pickers.includes(picker.type))
  },

  setScenesMenu(value) {
    this.isScenesMenuActive = value
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

  removeBlockActive() {
    videoPlayer.removeBlockActive()
  },

  computeKey(scope) {
    return (
      scope + (
        videoPlayer.block
          ? videoPlayer.block.get('id')
          : videoPlayer.activeSceneId
      )
    )
  },
})

export default EditorState
