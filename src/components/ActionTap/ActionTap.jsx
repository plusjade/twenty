import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import style from './style'

class ActionTap extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
    style: PropTypes.object,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div
          style={[
            style.default,
            this.props.style,
          ]}
        >
          <div
            style={[
              style.inner,
              this.props.dark && style.dark,
              this.props.bigger && style.bigger,
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

export default Radium(ActionTap)
