import React                  from 'react'
import IconPause              from './IconPause'
import IconPlay               from './IconPlay'

const Style = {
  wrap: {
    height: "60px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#222",
  },
  one: {
    flex: 1,
    boxSizing: "border-box",
    padding: "10px",
    verticalAlign: "top"
  },
  two: {
    flex: 8,
    boxSizing: "border-box",
    padding: "10px",
    verticalAlign: "top"
  },
  three: {
    flex: 1,
    boxSizing: "border-box",
    padding: "10px",
    verticalAlign: "top",
    color: "#FFF"
  },
  rangeInput: {
    width: "100%"
  }
}

const Player = (props) => {
  function formatTime(milliseconds) {
    return (milliseconds/1000.0).toFixed(1)
  }

  return (
    <div style={Style.wrap}>
      <div
        style={Style.one}
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
      </div><div style={Style.two}>
        <input
          style={Style.rangeInput}
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
      <div style={Style.three}>
        <small>
          {`${formatTime(props.timePosition)}/${formatTime(props.timeDuration)}`}
        </small>
      </div>
    </div>
  )
}

export default Player
