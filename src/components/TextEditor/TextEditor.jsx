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
    editor: PropTypes.object.isRequired,
  }

  onEnterText = (value) => {
    if (value) {
      this.onChangeText(value)
    } else {
      this.props.videoPlayer.removeBlockActive()
    }

    this.props.editor.toggleTextEditor()
  }

  onChangeText = (value) => {
    if (!value) { return }
    this.props.videoPlayer.text(value)
  }

  render() {
    return (
      <Overlay isActive={this.props.isActive}>
        <div style={style.default}>
          <EnterText
            value={this.props.videoPlayer.text()}
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
