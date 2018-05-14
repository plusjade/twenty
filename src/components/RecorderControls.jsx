import React                  from 'react'

import IconPause              from 'components/IconPause'
import IconRecord             from 'components/IconRecord'

const UStyles = {
  controlsInner: {
    wrap: {
      flex: 1,
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: "inherit",
    },
    one: {
      flex: 1,
      display: "flex",
      boxSizing: "border-box",
      lineHeight: "10px",
    },
    two: {
      flex: 1,
      display: "flex",
      textAlign: "center",
      boxSizing: "border-box",
    },
    three: {
      flex: 1,
      textAlign: "center",
      boxSizing: "border-box",
      color: "#FFF",
    },
    rangeInput: {
      width: "100%"
    }
  }
}

const RecorderControls = (props) => {
  function formatTime(milliseconds) {
    return (milliseconds/1000.0).toFixed(1)
  }

  return (
    <div style={UStyles.controlsInner.wrap}>
      <div style={UStyles.controlsInner.one}>
        <select
          value={props.mode}
          onChange={(e) => {
            props.updateMode(e.target.value)
          }}
        >
        {props.availableModes.map((type) => {
          return (
            <option value={type} key={type}>
              {type}
            </option>
          )
        })}
        </select>
      </div>
      <div style={UStyles.controlsInner.one}>
        <span style={{color: "#EEE"}}>
          {`${formatTime(props.timePosition)}`}
        </span>
      </div>

      <div style={UStyles.controlsInner.two}>
        {props.isPlaying
          ? <IconPause onClick={(e) => { e.preventDefault(); props.toggleRecord() }} />
          : <IconRecord onClick={(e) => { e.preventDefault(); props.toggleRecord() }} />
        }
      </div>

      <div style={UStyles.controlsInner.three}>
        <audio
          style={{width: "100%"}}
          src={props.audioSource}
          controls={"download"}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>

      </div>
      <div
        style={UStyles.controlsInner.three}
        onClick={props.finish}
      >
        Finish
      </div>
    </div>
  )
}

export default RecorderControls