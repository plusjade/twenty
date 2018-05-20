import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import style from './style'

class AddBlockButton extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div
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
      </Hammer>
    )
  }
}

export default Radium(AddBlockButton)
