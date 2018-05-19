import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import style from './style'

class Overlay extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div
          style={[
            style.default,
            this.props.style,
            this.props.isActive && style.isActive,
          ]}
        >
          {this.props.children}
        </div>
      </Hammer>
    )
  }
}

export default Radium(Overlay)
