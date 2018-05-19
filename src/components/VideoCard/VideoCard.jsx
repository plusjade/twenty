import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { token, videosRemove } from 'lib/actions'
import EditorButton from 'components/EditorButton/EditorButton'
import Player from 'components/Player'
import withPlay from 'containers/withPlay'
import { videosFind } from 'lib/actions'
import Video from 'lib/Video'
import style from './style'

const WrappedPlayer = withPlay(Player)

class VideoCard extends PureComponent {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    reload: PropTypes.func.isRequired,
    offset: PropTypes.bool.isRequired,
  }

  state = {
    videoData: null
  }

  UNSAFE_componentWillMount() {
    videosFind(this.props.videoId).then((videoData) => {
      this.setState({videoData})
    })
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
      videosRemove(this.props.videoId)
      this.props.reload()
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
          {this.state.videoData && (
            <WrappedPlayer
              video={(new Video(this.state.videoData))}
            />
          )}
        </div>
        <div style={style.tools}>
          <EditorButton
            onTap={this.handleRemove}
            dark
          >
            <div>{"X"}</div>
          </EditorButton>

          <EditorButton
            onTap={this.handleEdit}
            dark
          >
            <div>{"✍"}</div>
          </EditorButton>

          <EditorButton
            onTap={this.handleShow}
            dark
          >
            <div>{"GO"}</div>
          </EditorButton>
        </div>
      </div>
    )
  }
}

export default Radium(VideoCard)
