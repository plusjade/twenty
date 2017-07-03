const TimeKeeper = () => {
  const TICK_INTERVAL_MS = 50
  let tickInterval
  let timePositionPaused
  let timeStart

  reset()

  function reset() {
    tickInterval = undefined
    timePositionPaused = 0
    timeStart = undefined
  }

  function start(callback) {
    setTimeStart()
    tickInterval = setInterval(() => {
      if (typeof callback === "function") {
        callback(getTimePosition())
      }
    }, TICK_INTERVAL_MS)
  }

  function pause(time) {
    clearInterval(tickInterval)
    tickInterval = undefined
    timePositionPaused = time || getTimePosition()
    timeStart = undefined
  }

  function isPlaying() {
    return !!tickInterval
  }

  function getTimeStart() {
    return timeStart
  }

  function setTimeStart(time) {
    return timeStart = time || getTimeNow()
  }

  function getTimePosition() {
    return timePositionPaused + getTimeNow() - getTimeStart()
  }

  function getTimeNow() {
    return (new Date()).getTime()
  }

  return ({
    getTimePosition: getTimePosition,
    isPlaying: isPlaying,
    pause: pause,
    start: start,
    reset: reset,
  })
}

export default TimeKeeper
