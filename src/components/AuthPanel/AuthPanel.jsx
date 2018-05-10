import React, { PureComponent } from 'react'
import Radium from 'radium'
import Hammer from 'react-hammerjs'
import AuthContent from './AuthContent'
import style from './style'

class AuthPanel extends PureComponent {
  state = {
    isActive: false
  }

  toggleActive = () => {
    this.setState({isActive: !this.state.isActive})
  }

  render() {
    return (
      <div>
        <AuthContent
          isActive={this.state.isActive}
          toggleActive={this.toggleActive}
        />
        <Hammer onTap={this.toggleActive}>
          <div style={style.toggleIcon}>
            {"🤷‍♀️"}
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(AuthPanel)
