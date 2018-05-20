import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import style from './style'

class Overlay extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
    align: PropTypes.string,
    style: PropTypes.object,
    isActive: PropTypes.bool,
    full: PropTypes.bool,
  }

  static defaultProps = {
    isActive: false,
    align: 'bottom',
    onTap: null,
    style: {},
    full: false,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div
          style={[
            style.default,
            this.props.style,
            this.props.isActive && style.isActive,
            this.props.full && style.full,
            this.props.align === 'bottom' && style.alignBottom,
            this.props.align === 'top' && style.alignTop,
          ]}
        >
          {this.props.children}
        </div>
      </Hammer>
    )
  }
}

export default Radium(Overlay)
