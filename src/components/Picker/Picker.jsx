import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Overlay from 'components/Overlay/Overlay'
import ColorPicker from 'components/ColorPicker/ColorPicker'
import PickerAlign from 'components/PickerAlign/PickerAlign'
import PickerSize from 'components/PickerSize/PickerSize'
import TextEditor from 'components/TextEditor/TextEditor'

class Picker extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    activePicker: PropTypes.string,
    videoPlayer: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
  }

  onChangeColor = (value) => {
    if (this.props.videoPlayer.block) {
      this.props.videoPlayer.block.set('color_hsl', value)
    } else if (this.props.videoPlayer.activeScene) {
      this.props.videoPlayer.activeScene.color_hsl = value
    }
  }

  getColor = () => {
    const defaultColor = -100
    if (this.props.videoPlayer.block) {
      return this.props.videoPlayer.block.get('color_hsl') || defaultColor
    } else if (this.props.videoPlayer.activeScene) {
      return this.props.videoPlayer.activeScene.color_hsl
    }

    return defaultColor
  }

  isGrayscale = () => this.getColor() <= 0

  onChangeAlign = (value) => {
    if (!this.props.videoPlayer.block) { return }
    this.props.videoPlayer.block.set('align', value)
    this.props.videoPlayer.block.set('lifecycle', 'replay')
  }

  onChangeSize = (value) => {
    if (!this.props.videoPlayer.block) { return }
    this.props.videoPlayer.block.set('size', value)
  }

  getSize = () => {
    const defaultValue = 80
    if (!this.props.videoPlayer.block) { return defaultValue }
    const value = this.props.videoPlayer.block.get('size') || defaultValue

    return value
  }

  getRotation = () => {
    if (!this.props.videoPlayer.block) { return 0 }
    const rotation = this.props.videoPlayer.block.get('rotation') || 0
    if (!rotation) { return 0 }

    return rotation.replace('deg', '')
  }

  changeRotation = (value) => {
    if (!this.props.videoPlayer.block) { return }
    this.props.videoPlayer.block.set('rotation', `${+value}deg`)
  }

  getBottomPanelContent() {
    switch(this.props.activePicker) {
      case 'color': {
        return (
          <ColorPicker
            key={this.props.editorState.computeKey('color')}
            onChange={this.onChangeColor}
            initialValue={this.getColor()}
            isGrayscale={this.isGrayscale()}
          />
        )
      }
      case 'text': {
        return (
          <TextEditor
            key={this.props.editorState.computeKey('text')}
            isActive={true}
            videoPlayer={this.props.videoPlayer}
            editorState={this.props.editorState}
          />
        )
      }
      case 'align': {
        return (
          <PickerAlign
            key={this.props.editorState.computeKey('align')}
            onChange={this.onChangeAlign}
          />
        )
      }
      case 'size': {
        return (
          <PickerSize
            key={this.props.editorState.computeKey('size')}
            onChange={this.onChangeSize}
            initialValue={this.getSize()}
          />
        )
      }
      default: {
        return null
      }
    }
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        style={{zIndex: 300, backgroundColor: '#F5F5F5'}}
      >
        {this.getBottomPanelContent()}
      </Overlay>
    )
  }
}

export default observer(Radium(Picker))
