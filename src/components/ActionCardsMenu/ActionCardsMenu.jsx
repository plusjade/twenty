import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style'

class ActionCardsMenu extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    return (
      <div style={style.default}>
        {this.props.children}
      </div>
    )
  }
}

export default Radium(ActionCardsMenu)
