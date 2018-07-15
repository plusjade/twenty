import { observer } from "mobx-react"
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import BlocksMenu from 'components/BlocksMenu/BlocksMenu'
import SceneActionsMenu from 'components/SceneActionsMenu/SceneActionsMenu'
import BlockActionsMenu from 'components/BlockActionsMenu/BlockActionsMenu'
import Picker from 'components/Picker/Picker'

const EditorNode = window.document.getElementById('editor-root')
const style = {
  position: 'fixed',
  bottom: 0,
  height: '18vh',
  overflow: 'hidden',
  width: '100vw',
  // background: '#F5F5F5',
  // boxShadow: 'rgba(0, 0, 0, 0.3) 0px -1px 10px',
  zIndex: 2000,
}

class Editor extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    videoPlayer: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
  }

  componentDidMount() {
    Object.keys(style).forEach((key) => {
      EditorNode.style[key] = style[key]
    })
  }

  render() {
    const components = [
      <BlocksMenu
        key='BlocksMenu'
        isActive={this.props.editor.shouldShowBlocks}
        videoPlayer={this.props.videoPlayer}
        video={this.props.video}
        editor={this.props.editor}
      />,
      <BlockActionsMenu
        key='BlockActionsMenu'
        isActive={this.props.editor.shouldShowBlockActions}
        videoPlayer={this.props.videoPlayer}
        editor={this.props.editor}
      />,
      <Picker
        key='Picker'
        isActive={this.props.editor.shouldShowPicker}
        activePicker={this.props.editor.activePicker}
        videoPlayer={this.props.videoPlayer}
        editor={this.props.editor}
      />,
      <SceneActionsMenu
        key='SceneActionsMenu'
        isActive={this.props.editor.shouldShowSceneActions}
        editor={this.props.editor}
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
