import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import EnterText from 'components/EnterText/EnterText'
import Overlay from 'components/Overlay/Overlay'
import style from './style'

class TextEditor extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    video: PropTypes.object.isRequired,
    videoPlayer: PropTypes.object.isRequired,
  }

  onEnterText = (value) => {
    if (value) {
      this.props.videoPlayer.editBlockActive({content: value})
    } else {
      this.props.videoPlayer.removeBlockActive()
    }
    this.props.toggleEditText()
  }

  onChangeText = (value) => {
    if (value) {
      this.props.videoPlayer.editBlockActive({content: value})
    }
  }

  getStagedText = () => {
    const block = this.props.videoPlayer.block

    if (!block) { return '' }

    return (
      block.get('content') || (block.get('data') && block.get('data').content)
    )
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        onTap={this.props.toggleEditText}
      >
        <div style={style.default}>
          <EnterText
            value={this.getStagedText()}
            onSubmit={this.onEnterText}
            onChange={this.onChangeText}
            isActive
          />
        </div>
      </Overlay>
    )
  }
}

export default observer(Radium(TextEditor))
