import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import style from './Style'

class Layer extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div
          id={this.props.id ? this.props.id : null}
          style={[
            style.default,
            this.props.style,
            this.props.isHidden && style.hidden,
          ]}
        >
          {this.props.children}
        </div>
      </Hammer>
    )
  }
}

export default Radium(Layer)
