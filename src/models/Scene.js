import { token, dateStampGenerate } from 'lib/actions'
import { toJS } from "mobx"
import { getColorHsl } from 'lib/transforms'

const DEFAULT_COLOR_HSL = -100 // white

const Scene = (_object_ = {}) => ({
  id: _object_.id || `scene_${token()}`,
  _dateStamp: _object_.dateStamp || dateStampGenerate(),
  _blocksIndex: [...(_object_.blocksIndex || [])],
  _transitions: _object_.transitions || {},

  isActive: false,
  color_hsl: _object_.color_hsl || DEFAULT_COLOR_HSL,

  get color() {
    const colorHsl = +this.color_hsl || DEFAULT_COLOR_HSL
    return getColorHsl(colorHsl)
  },

  get blocksIndex() {
    return this._blocksIndex
  },

  get transitions() {
    return this._transitions
  },

  get dateStamp() {
    return this._dateStamp
  },

  set dateStamp(dateStamp) {
    return this._dateStamp = dateStamp
  },

  addBlockRef(blockId) {
    if (!this.blocksIndex.includes(blockId)) {
      this._blocksIndex.push(blockId)
    }
  },

  removeBlockRef(blockId) {
    const index = this.blocksIndex.indexOf(blockId)
    this._blocksIndex.splice(index, 1)
  },

  setTransitions(transitions) {
    this._transitions = {...transitions}
  },

  get serialized() {
    return({
      id: this.id,
      blocksIndex: toJS(this.blocksIndex),
      transitions: toJS(this.transitions),
      dateStamp: this.dateStamp,
      color_hsl: this.color_hsl,
      version: 'meep',
    })
  }
})

export default Scene

