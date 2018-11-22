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
    editor: PropTypes.object.isRequired,
  }

  onChangeColor = (value) => {
    this.props.videoPlayer.color(value)
  }

  onChangeAlign = (value) => {
    this.props.videoPlayer.align(value)
  }

  onChangeSize = (value) => {
    this.props.videoPlayer.size(value)
  }

  getBottomPanelContent() {
    switch(this.props.activePicker) {
      case 'color': {
        return (
          <ColorPicker
            key={this.props.videoPlayer.computeKey('color')}
            onChange={this.onChangeColor}
            initialValue={this.props.videoPlayer.color()}
            isGrayscale={this.props.videoPlayer.isGrayscale}
          />
        )
      }
      case 'text': {
        return (
          <TextEditor
            key={this.props.videoPlayer.computeKey('text')}
            isActive={true}
            videoPlayer={this.props.videoPlayer}
            editor={this.props.editor}
          />
        )
      }
      case 'align': {
        return (
          <PickerAlign
            key={this.props.videoPlayer.computeKey('align')}
            onChange={this.onChangeAlign}
          />
        )
      }
      case 'size': {
        return (
          <PickerSize
            key={this.props.videoPlayer.computeKey('size')}
            onChange={this.onChangeSize}
            initialValue={this.props.videoPlayer.size()}
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
        <div style={{flex: '0 0 12vh'}}>
          {this.getBottomPanelContent()}
        </div>
      </Overlay>
    )
  }
}

export default observer(Radium(Picker))
