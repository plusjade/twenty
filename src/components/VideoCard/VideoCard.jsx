import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { token, videoFind, videoRemove } from 'lib/actions'
import EditorButton from 'components/EditorButton/EditorButton'

import Player from 'components/Player'
import withPlay from 'containers/withPlay'
import Video from 'lib/Video'

import style from './style'

// {React.createElement(
//   withPlay(Player),
//   {video: new Video(videoFind(this.props.videoId))}
// )}

class VideoCard extends PureComponent {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    created_at: PropTypes.string,
    offset: PropTypes.bool,
  }

  getRef = (node) => {
    this.node = node
  }

  handleCreateNew = (e) => {
    e.preventDefault()
    window.location = `/?id=${token()}&edit=1`
  }

  handleShow = () => {
    window.location = `/?id=${this.props.videoId}`
  }

  handleEdit = () => {
    window.location = `/?id=${this.props.videoId}&edit=1`
  }

  handleRemove = () => {
    if (window.confirm(`delete '${this.props.videoId}' video forever?`)) {
      videoRemove(this.props.videoId)
      window.location.reload()
    }
  }

  render() {
    return (
      <div
        style={[
          style.video,
          this.props.offset && style.offset
        ]}
      >
        <div style={style.innerWrap}>
          <iframe
            title={`?id=${this.props.videoId}`}
            src={`?id=${this.props.videoId}`}
            style={style.iframe}
            frameBorder={"0"}
          />
          <div style={style.editor}>
            <EditorButton
              onTap={this.handleShow}
              dark
            >
              <div>{"GO"}</div>
            </EditorButton>

            <EditorButton
              onTap={this.handleEdit}
              dark
            >
              <div>{"✍"}</div>
            </EditorButton>
            <EditorButton
              onTap={this.handleRemove}
              dark
            >
              <div>{"X"}</div>
            </EditorButton>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(VideoCard)
