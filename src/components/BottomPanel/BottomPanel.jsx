import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import style from './style'

class BottomPanel extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
  }

  render() {
    return (
      <div
        style={[
          style.wrap,
          this.props.isActive && style.isActive,
        ]}
      >
        {React.Children.map(this.props.children, c => c)}
      </div>
    )
  }
}

export default Radium(BottomPanel)
