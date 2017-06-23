import React                  from 'react'
import IconPause              from './IconPause'
import IconPlay               from './IconPlay'
import StylesWrapper          from '../styles/Wrapper'

const PlayerControls = (props) => {
  function formatTime(milliseconds) {
    return (milliseconds/1000.0).toFixed(1)
  }

  return (
    <div style={StylesWrapper.controlsInner.wrap}>
      <div
        style={StylesWrapper.controlsInner.one}
        onClick={(e) => {
          e.preventDefault()
          if (props.isPaused) {
            props.play()
          } else if (props.timePosition >= props.timeDuration ) {
            props.replay()
          }
          else {
            props.pause()
          }
        }}
      >
        {props.isPaused ? <IconPlay /> : <IconPause />}
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
          {`${formatTime(props.timePosition)}/${formatTime(props.timeDuration)}`}
        </small>
      </div>
    </div>
  )
}

export default PlayerControls
