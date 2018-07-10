import { observer } from "mobx-react"
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Radium from 'radium'
import LaunchMenu from 'components/LaunchMenu/LaunchMenu'
import BlocksMenu from 'components/BlocksMenu/BlocksMenu'
import SceneActionsMenu from 'components/SceneActionsMenu/SceneActionsMenu'
import BlockActionsMenu from 'components/BlockActionsMenu/BlockActionsMenu'
import TextEditor from 'components/TextEditor/TextEditor'

import Picker from 'components/Picker/Picker'
import ColorPicker from 'components/ColorPicker/ColorPicker'
import PickerAlign from 'components/PickerAlign/PickerAlign'
import PickerSize from 'components/PickerSize/PickerSize'

const EditorNode = window.document.getElementById('editor-root')
const style = {
  position: 'fixed',
  bottom: 0,
  height: '18vh',
  overflow: 'hidden',
  width: '100vw',
  background: '#FFF',
  zIndex: 2000,
}

class Editor extends Component {
  static propTypes = {
    isEditingText: PropTypes.bool.isRequired,
    isBottomPanelActive: PropTypes.bool.isRequired,
    isScenesMenuActive: PropTypes.bool.isRequired,
    toggleEditText: PropTypes.func.isRequired,
    toggleBottomPanel: PropTypes.func.isRequired,
    scenesMenuToggle: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
    videoPlayer: PropTypes.func.isRequired,
  }

  componentDidMount() {
    Object.keys(style).forEach((key) => {
      EditorNode.style[key] = style[key]
    })
  }

  render() {
    const scenes = this.props.video.getScenes()
    const components = [
      <BlockActionsMenu
        key='BlockActionsMenu'
        isActive={!!this.props.videoPlayer.block}
        video={this.props.video}
        videoPlayer={this.props.videoPlayer}

        toggleEditText={this.props.toggleEditText}
        toggleBottomPanel={this.props.toggleBottomPanel}
      />,
      <TextEditor
        key='TextEditor'
        isActive={this.props.isEditingText}
        video={this.props.video}
        videoPlayer={this.props.videoPlayer}
        toggleEditText={this.props.toggleEditText}
      />,
      <Picker
        isActive={this.props.isBottomPanelActive}
        videoPlayer={this.props.videoPlayer}
      />,
      <BlocksMenu
        key='BlocksMenu'
        isActive={
          !this.props.isBottomPanelActive
            && !this.props.isScenesMenuActive
            && !this.props.videoPlayer.block
        }
        toggleBottomPanel={this.props.toggleBottomPanel}
        videoPlayer={this.props.videoPlayer}
      />,
      <SceneActionsMenu
        key='SceneActionsMenu'
        isActive={this.props.isScenesMenuActive}
        video={this.props.video}
        toggleBottomPanel={this.props.toggleBottomPanel}
        scenesMenuToggle={this.props.scenesMenuToggle}
      />,
    ]

    return (
      ReactDOM.createPortal(
        components,
        EditorNode
      )
    )
  }
}

export default observer(Editor)
