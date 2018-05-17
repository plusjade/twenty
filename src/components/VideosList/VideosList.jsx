import Radium from 'radium'
import React, { PureComponent }   from 'react'
import { videosList } from 'lib/actions'
import VideoCard from 'components/VideoCard/VideoCard'
import VideosAdd from 'components/VideosAdd/VideosAdd'
import style from './Style'

class VideosList extends PureComponent {
  reload = () => {
    this.setState({entropy: Math.random()})
  }

  render() {
    const videos = videosList()
    return (
      <div style={style.wrap}>
        <VideosAdd />
        <br />
        {videos.map((v, i) => (
          <VideoCard
            key={v.videoId}
            videoId={v.videoId}
            reload={this.reload}
            created_at={v.created_at}
            offset={i % 2 === 1}
          />
        ))}
        {videos.length > 1 && (
          <VideosAdd />
        )}
      </div>
    )
  }
}

export default Radium(VideosList)
