const TimeKeeper = () => {
  const TICK_INTERVAL_MS = 50
  let tickInterval
  let timePosition
  let timePositionPaused
  let timeStart
  reset()

  function reset() {
    tickInterval = undefined
    timePosition = 0
    timePositionPaused = 0
    timeStart = undefined
  }

  function start(callback) {
    setTimeStart()
    tickInterval = setInterval(() => {
      const newPosition = setTimePosition()
      if (typeof callback === "function") {
        callback(newPosition)
      }
    }, TICK_INTERVAL_MS)
  }

  function pause(time) {
    clearInterval(tickInterval)
    tickInterval = undefined
    timePositionPaused = time || getTimePosition()
    timeStart = undefined
  }

  function isPaused() {
    return !tickInterval
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

  function setTimePosition(time) {
    return timePosition = time || getTimePosition()
  }

  function getTimeNow() {
    return (new Date()).getTime()
  }

  return ({
    getTimePosition: getTimePosition,
    isPaused: isPaused,
    pause: pause,
    start: start,
    reset: reset,
  })
}

export default TimeKeeper
