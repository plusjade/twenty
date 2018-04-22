import Radium                 from 'radium'
import React                  from 'react'
import PropTypes              from 'prop-types'

import IconPause              from 'components/IconPause'
import IconPlay               from 'components/IconPlay'
import Style                  from './Style'

function PlayerControls(props) {
  const iconStyle = [{height: 60, width: 60}, Style.playToggle.icon]

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
