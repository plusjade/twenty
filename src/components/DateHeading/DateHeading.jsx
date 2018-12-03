import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import BlocksRegistry from 'models/BlocksRegistry'
import ActionTap from 'components/ActionTap/ActionTap'
import { getColor } from 'lib/transforms'

import style from './style'

class DateHeading extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isToday: PropTypes.bool.isRequired,
    onTap: PropTypes.func,
    hasContent: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Hammer onTap={this.props.onTap}>
        <div
          style={[
            style.dateString,
            this.props.hasContent && style.hasContent,
            this.props.isToday && style.isToday,
          ]}
        >
          <div style={{flex: 1}}>
            {this.props.label}
          </div>
          <div style={{flex: 1, textAlign: 'right'}}>
            {this.props.text}
          </div>
        </div>
      </Hammer>
    )
  }
}

export default Radium(DateHeading)
