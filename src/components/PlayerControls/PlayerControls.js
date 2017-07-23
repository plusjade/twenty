import React                  from 'react'
import PropTypes              from 'prop-types'

import Style                  from './Style'

import IconPause              from 'components/IconPause'
import IconPlay               from 'components/IconPlay'

import Slider                 from 'material-ui/Slider'
import darkBaseTheme          from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme            from 'material-ui/styles/getMuiTheme'

function PlayerControls(props) {
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
    <div style={Style.wrap}>
      {props.isPlayable() && (
        <div style={Style.sliderWrap}>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Slider
              min={0}
              max={props.timeDuration}
              value={props.timePosition}
              onChange={(e, value) => {
                const time = parseFloat(value)
                if (time > 0) {
                  props.seekTo(time)
                }
              }}
              style={{width: "100%"}}
              sliderStyle={{margin: 0}}
            />
          </MuiThemeProvider>
        </div>
      )}
      <div style={Style.one}>
        <a
          href="#library"
          style={Style.libraryLink}
          onClick={(e) => {
            e.preventDefault()
            props.toggleLibrary()
          }}
        >
          Library
        </a>
      </div>
      <div style={Style.two}>
      {props.isPlayable() && (
        <div
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
      )}
      </div>
      <div style={Style.three}>
      {props.isPlayable() && (
        <small>
          {formatTime(props.timeDuration - props.timePosition)}
        </small>
      )}
      </div>
    </div>
  )
}
PlayerControls.propTypes = {
  isPlaying: PropTypes.func.isRequired,
  isPlayable: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  replay: PropTypes.func.isRequired,
  seekTo: PropTypes.func.isRequired,
  timeDuration: PropTypes.number,
  timePosition: PropTypes.number,
}

export default PlayerControls
