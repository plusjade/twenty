class TimeKeeper {
  TICK_INTERVAL_MS = 50
  tickInterval = undefined
  timePositionPaused = 0
  timeStart = undefined

  reset = () => {
    clearInterval(this.tickInterval)
    this.tickInterval = undefined
    this.timePositionPaused = 0
    this.timeStart = undefined
  }

  start = (callback) => {
    this.setTimeStart()
    this.tickInterval = setInterval(() => {
      if (typeof callback === "function") {
        callback(this.getTimePosition())
      }
    }, this.TICK_INTERVAL_MS)
  }

  pause = (time) => {
    clearInterval(this.tickInterval)
    this.tickInterval = undefined
    this.timePositionPaused = time || this.getTimePosition()
    this.timeStart = undefined
  }

  isPlaying = () => !!this.tickInterval

  getTimeStart = () => this.timeStart

  setTimeStart = time => (
    this.timeStart = time || this.getTimeNow()
  )

  getTimePosition = () => (
    this.timePositionPaused + this.getTimeNow() - this.getTimeStart()
  )

  // TODO Date.now
  // http://underscorejs.org/docs/underscore.html#section-159
  getTimeNow = () => (new Date()).getTime()
}

export default TimeKeeper
