import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ActionTap from 'components/ActionTap/ActionTap'
import style from './style'

class LaunchMenu extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    scenePosition: PropTypes.number.isRequired,
    totalScenes: PropTypes.number.isRequired,
  }

  handleTapHome = () => {
    window.location = '/'
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  render() {
    return (
      <div style={[
        style.default,
        this.props.isActive && style.isActive,
      ]}>

        <ActionTap
          onTap={this.handleTapLeft}
          disabled={this.props.scenePosition <= 1}
        >
          <div style={[{transform: "rotate(180deg)"}]}>
            <span>
              ➜
            </span>
          </div>
        </ActionTap>

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

        <ActionTap
          onTap={this.handleTapRight}
          disabled={this.props.scenePosition >= this.props.totalScenes}
        >
          <div>
            ➜
          </div>
        </ActionTap>
      </div>
    )
  }
}

export default Radium(LaunchMenu)
