import { token, dateId } from 'lib/actions'
import { toJS } from 'mobx'
import { getColorHsl } from 'lib/transforms'

const DEFAULT_COLOR_HSL = -100 // white
const DATE_OPTONS = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}

const Scene = (object = {}) => ({
  id: object.id || `scene_${token()}`,
  isActive: false,
  color_hsl: object.color_hsl || DEFAULT_COLOR_HSL,
  dateIdInitial: object.dateId || dateId(),
  blocksIndexInitial: [...(object.blocksIndex || [])],
  transitionsInitial: {...(object.transitions || {})},

  get dateId() {
    return this.dateIdInitial || dateId()
  },

  get dateString() {
    return new Intl.DateTimeFormat('en-US', DATE_OPTONS).format(this.dateObject)
  },

  get dateObject() {
    return new Date(this.dateId)
  },

  setDate(date) {
    this.dateIdInitial = dateId(date)
  },

  get color() {
    const colorHsl = +this.color_hsl || DEFAULT_COLOR_HSL
    return getColorHsl(colorHsl)
  },

  get blocksIndex() {
    return this.blocksIndexInitial
  },

  get transitions() {
    return this.transitionsInitial
  },

  addBlockRef(blockId) {
    if (!this.blocksIndex.includes(blockId)) {
      this.blocksIndexInitial.push(blockId)
    }
  },

  removeBlockRef(blockId) {
    const index = this.blocksIndex.indexOf(blockId)
    this.blocksIndexInitial.splice(index, 1)
  },

  setTransitions(newTransitions) {
    this.transitionsInitial = {...newTransitions}
  },

  get serialized() {
    return({
      id: this.id,
      blocksIndex: toJS(this.blocksIndex),
      transitions: toJS(this.transitions),
      dateId: this.dateId,
      dateString: this.dateString,
      color_hsl: this.color_hsl,
      version: 'meep',
    })
  }
})

export default Scene
