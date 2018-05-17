import React, { PureComponent } from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import style from './style'

class BottomPanel extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
  }

  render() {
    return(
      <div style={[style.wrap, this.props.isActive && style.isActive]}>
        {this.props.children}
      </div>
    )
  }
}

export default Radium(BottomPanel)
