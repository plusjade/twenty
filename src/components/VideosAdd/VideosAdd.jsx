import Radium from 'radium'
import React, { PureComponent }   from 'react'
import { token, videosSave } from 'lib/actions'
import Video from 'models/Video'
import randomEmoji from 'db/randomEmoji'
import style from './style'

class VideosAdd extends PureComponent {
   handleCreateNew = (e) => {
    e.preventDefault()
    const videoId = token()
    const subscribe = (data) => {
      videosSave(videoId, data, false) // don't save to db
    }
    const video = new Video({subscribe: subscribe})

    window.location = `/?id=${videoId}&edit=1&debug=1`
  }

  render() {
    return (
      <div style={style.video}>
        <a
          href={'#new'}
          onClick={this.handleCreateNew}
          style={style.inner}
        >
          <span>{'+ make something'}</span>
        </a>
      </div>
    )
  }
}

export default Radium(VideosAdd)
