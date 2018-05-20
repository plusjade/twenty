import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ActionTap from 'components/ActionTap/ActionTap'
import style from './style'

class BlocksMenuOpen extends PureComponent {
  static propTypes = {
    blocksMenuToggle: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div style={style.default}>
        <ActionTap onTap={this.props.blocksMenuToggle}>
          <div>+</div>
        </ActionTap>
      </div>
    )
  }
}

export default Radium(BlocksMenuOpen)
