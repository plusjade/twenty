import React, {PropTypes}     from 'react'

import IconPause              from 'components/IconPause'
import IconPlay               from 'components/IconPlay'

import StylesWrapper          from 'styles/Wrapper'

const PlayerControls = (props) => {
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
    <div style={StylesWrapper.controlsInner.wrap}>
      <div
        style={StylesWrapper.controlsInner.one}
        onClick={(e) => {
          e.preventDefault()
          if (props.isPlaying()) {
            props.pause()
          } else if (props.timePosition >= props.timeDuration ) {
            props.replay()
          }
          else {
            props.play()
          }
        }}
      >
        {props.isPlaying() ? <IconPause /> : <IconPlay />}
      </div>
      <div style={StylesWrapper.controlsInner.two}>
        <input
          style={StylesWrapper.controlsInner.rangeInput}
          type="range"
          min="0"
          max={props.timeDuration}
          value={props.timePosition}
          onChange={(e) => {
            const time = parseFloat(e.target.value)
            if (time > 0) {
              props.seekTo(time)
            }
          }}
        />
      </div>
      <div style={StylesWrapper.controlsInner.three}>
        <small>
          {formatTime(props.timeDuration - props.timePosition)}
        </small>
      </div>
    </div>
  )
}
PlayerControls.propTypes = {
  isPlaying: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  replay: PropTypes.func.isRequired,
  seekTo: PropTypes.func.isRequired,
  timeDuration: PropTypes.number,
  timePosition: PropTypes.number,
}

export default PlayerControls
