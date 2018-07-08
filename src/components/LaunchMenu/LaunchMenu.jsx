import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ActionTap from 'components/ActionTap/ActionTap'
import style from './style'

class LaunchMenu extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    videoPlayer: PropTypes.object.isRequired,
    scenePosition: PropTypes.number.isRequired,
    totalScenes: PropTypes.number.isRequired,
  }

  handleTapHome = () => {
    window.location = '/'
  }

  handleTapLeft = (e) => {
    this.props.videoPlayer.sceneTransition({option: 'prev'})
  }

  handleTapRight = () => {
    this.props.videoPlayer.sceneTransition()
  }

  render() {
    return (
      <div
        style={[
          style.default,
          this.props.isActive && style.isActive,
        ]}
      >
        <div style={style.verticalWrap}>
          <ActionTap
            onTap={this.props.onTap}
            bigger
          >
            <div>+</div>
          </ActionTap>

          <ActionTap onTap={this.props.scenesMenuToggle}>
            <div>
              {`${this.props.scenePosition}/${this.props.totalScenes}`}
            </div>
          </ActionTap>
        </div>
      </div>
    )
  }
}

export default Radium(LaunchMenu)
