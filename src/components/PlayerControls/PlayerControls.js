import React                  from 'react'
import PropTypes              from 'prop-types'

import IconPause              from 'components/IconPause'
import IconPlay               from 'components/IconPlay'
import Style                  from './Style'

import Slider                 from 'material-ui/Slider'
import darkBaseTheme          from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme            from 'material-ui/styles/getMuiTheme'

function PlayerControls(props) {
  function renderIcon() {
    if (props.isPlaying()) {
      return (<IconPause style={{height: 20, width: 20}} />)
    } else {
      return (<IconPlay style={{height: 20, width: 20}}  />)
    }
  }

  return (
    <div style={Style.wrap}>
      {props.isPlayable() && (
        <div style={Style.one}>
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
      {props.isPlayable() && (
        <div style={Style.three}>
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
          {renderIcon()}
          </div>
        </div>
      )}
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
