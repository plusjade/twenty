import React, { PureComponent } from 'react'
import AuthPanel from 'components/AuthPanel/AuthPanel'
import VideosList from 'components/VideosList/VideosList'

class Home extends PureComponent {
  render() {
    return(
      <div>
        <AuthPanel />
        <VideosList />
      </div>
    )
  }
}

export default Home
