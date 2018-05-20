import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style'

class AddBlockButton extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
  }

  render() {
    return (
      <div
        onClick={this.props.onTap}
        style={[
          style.default
        ]}
      >
        <div
          style={[
            style.inner,
            this.props.disabled && style.disabled,
          ]}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Radium(AddBlockButton)
