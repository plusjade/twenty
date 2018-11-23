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
    videoPlayer: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
  }

  onEnterText = (value) => {
    if (value) {
      this.onChangeText(value)
    } else {
      this.props.editorState.removeBlockActive()
    }

    this.props.editorState.clearLast()
  }

  onChangeText = (value) => {
    if (!value) { return }
    if (!this.props.videoPlayer.block) { return }

    this.props.videoPlayer.block.set('content', value)
  }

  getText() {
    if (!this.props.videoPlayer.block) { return '' }

    return (
      this.props.videoPlayer.block.get('content') || (this.props.videoPlayer.block.get('data') && this.props.videoPlayer.block.get('data').content)
    )
  }

  render() {
    return (
      <div style={{flex: '0 0 12vh'}}>
        <div style={style.default}>
          <EnterText
            value={this.getText()}
            onSubmit={this.onEnterText}
            onChange={this.onChangeText}
            isActive
          />
        </div>
      </div>
    )
  }
}

export default observer(Radium(TextEditor))
