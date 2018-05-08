import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { token, videoRemove } from 'lib/actions'
import EditorButton from 'components/EditorButton/EditorButton'
import style from './style'

class VideoCard extends PureComponent {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    reload: PropTypes.func.isRequired,
    offset: PropTypes.bool.isRequired,
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
          </div>

          <div style={style.edit}>
            <EditorButton
              onTap={this.handleEdit}
              dark
            >
              <div>{"✍"}</div>
            </EditorButton>
          </div>
          <div style={style.remove}>
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
