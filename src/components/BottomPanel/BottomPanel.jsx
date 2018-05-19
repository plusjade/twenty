import React, { PureComponent } from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import style from './style'

class BottomPanel extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
  }

  render() {
    return(
      <Overlay
        isActive={this.props.isActive}
        onTap={this.props.toggleBottomPanel}
      >
        {this.props.children}
      </Overlay>
    )
  }
}

export default Radium(BottomPanel)
