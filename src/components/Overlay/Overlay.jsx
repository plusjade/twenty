import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import style from './style'

class Overlay extends PureComponent {
  static propTypes = {
    onTap: PropTypes.func,
    style: PropTypes.object,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    isActive: false,
    onTap: null,
    style: {},
  }

  render() {
    return (
      <div
        style={[
          style.default,
          this.props.style,
          this.props.isActive && style.isActive,
          this.props.onTap && style.full,
        ]}
      >
        {this.props.onTap && (
          <Hammer onTap={this.props.onTap}>
            <div style={style.clickOut} />
          </Hammer>
        )}
        <div
          style={[
            style.listWrap.default,
          ]}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Radium(Overlay)
