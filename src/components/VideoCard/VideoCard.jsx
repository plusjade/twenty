import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { token, videoRemove } from 'lib/actions'
import EditorButton from 'components/EditorButton/EditorButton'
import style from './style'

class VideoCard extends PureComponent {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    created_at: PropTypes.string,
    offset: PropTypes.bool,
  }

   handleCreateNew = (e) => {
    e.preventDefault()
    window.location = `/?id=${token()}&edit=1`
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
        <a
          style={style.inner}
          href={`/?id=${this.props.videoId}`}
        >
          <span>{this.props.created_at}</span>
          <br/>
          <span>{` ${this.props.videoId} `}</span>
        </a>

        <div style={style.editor}>
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
    )
  }
}

export default Radium(VideoCard)
