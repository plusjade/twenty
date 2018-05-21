import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ActionTap from 'components/ActionTap/ActionTap'
import style from './style'

class LaunchMenu extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func.isRequired,
  }

  handleTapHome = () => {
    window.location = '/'
  }

  render() {
    return (
      <div style={style.default}>
        <ActionTap
          onTap={this.handleTapHome}
          dark
        >
          <div>{"🏠"}</div>
        </ActionTap>

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
    )
  }
}

export default Radium(LaunchMenu)
