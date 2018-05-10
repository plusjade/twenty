import React, { PureComponent } from 'react'
import AuthPanel from 'components/AuthPanel/AuthPanel'
import Library from 'containers/Library/Library'

class Home extends PureComponent {
  render() {
    return(
      <div>
        <AuthPanel />
        <Library isOpen />
      </div>
    )
  }
}

export default Home
