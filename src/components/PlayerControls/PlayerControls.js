import Radium                 from 'radium'
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
  const iconStyle = [{height: 30, width: 30}, Style.playToggle.icon]

  function renderIcon() {
    if (props.isPlaying) {
      return (<IconPause style={iconStyle} />)
    } else {
      return (
        <IconPlay style={iconStyle} />
      )
    }
  }

  return (
    <div
      style={[
        Style.controls.default,
        props.isActive && Style.controls.active
      ]}
    >
      <div style={[Style.wrap.default]}>
        {props.isPlayable() && (
          <div style={Style.one}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <Slider
                min={0}
                max={props.timeDuration}
                value={props.timePosition}
                onChange={(e, value) => {
                  const time = Math.floor(parseFloat(value))
                  if (time >= 0) {
                    props.seekTo(time)
                  }
                }}
                style={{width: "100%"}}
                sliderStyle={{margin: 0}}
              />
            </MuiThemeProvider>
          </div>
        )}
      </div>

      {props.isPlayable() && (
        <div
          style={[
            Style.playToggle.default,
            props.isActive && Style.playToggle.active
          ]}
        >
          <span
            onClick={(e) => {
              e.preventDefault()
              if (props.isPlaying) {
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
          </span>
        </div>
      )}
    </div>
  )
}
PlayerControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isPlayable: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  replay: PropTypes.func.isRequired,
  seekTo: PropTypes.func.isRequired,
  timeDuration: PropTypes.number,
  timePosition: PropTypes.number,
}

export default Radium(PlayerControls)
