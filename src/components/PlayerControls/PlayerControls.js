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
      </div>
      <div style={Style.two}>
      </div>
      <div style={Style.three}>
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
