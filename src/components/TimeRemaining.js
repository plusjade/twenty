import React from 'react'

function TimeRemaining(props) {
  function padZero(number) {
    if ((`${number}`).length === 1) {
      return `0${number}`
    } else {
      return number
    }
  }

  function formatTime(milliseconds) {
    const seconds = (milliseconds/1000.0).toFixed(0)
    const minutes = Math.floor(seconds/60.0)
    return (`-${padZero(minutes)}:${padZero(seconds - (minutes*60))}`)
  }

  return (
    <small>
      {formatTime(props.time)}
    </small>
  )
}

export default TimeRemaining
