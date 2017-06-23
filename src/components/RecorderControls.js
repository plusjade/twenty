import React                  from 'react'
import IconPause              from './IconPause'
import IconPlay               from './IconPlay'
import IconRecord             from './IconRecord'

import StylesWrapper          from '../styles/Wrapper'

const RecorderControls = (props) => {
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
            props.record()
          }
          else {
            props.pause()
          }
        }}
      >
        {props.isPaused ? <IconRecord /> : <IconPause />}
      </div>
      <div style={StylesWrapper.controlsInner.two}>
        <span style={{color: "#EEE"}}>
          {`${formatTime(props.timePosition)}`}
        </span>
      </div>
      <div style={StylesWrapper.controlsInner.three}>
        -
      </div>
    </div>
  )
}

export default RecorderControls
