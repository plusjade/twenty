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
  default: {
    position: 'fixed',
    bottom: 0,
    height: '12vh',
    overflow: 'hidden',
    width: '100vw',
    // background: '#F5F5F5',
    // boxShadow: 'rgba(0, 0, 0, 0.3) 0px -1px 10px',
    zIndex: 2000,
  },
  isLandscape: {
    left: 0,
    height: '100vh',
    overflow: 'hidden',
    width: '30vw',
  }
}

class Editor extends Component {
  static propTypes = {
    videoPlayer: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    blocksRegistry: PropTypes.array.isRequired,
  }

  componentDidMount() {
    let scopedStyle = style.default
    if (this.props.videoPlayer.isLandscape) { // TODO this doesn't change
      scopedStyle = {...style.default, ...style.isLandscape}
    }

    Object.keys(scopedStyle).forEach((key) => {
      EditorNode.style[key] = scopedStyle[key]
    })
  }

  render() {
    const components = [
      <BlocksMenu
        key='BlocksMenu'
        blocksRegistry={this.props.blocksRegistry}
        isActive={this.props.editorState.shouldShowBlocks}
        videoPlayer={this.props.videoPlayer}
      />,
      <BlockActionsMenu
        key='BlockActionsMenu'
        isActive={this.props.editorState.shouldShowBlockActions}
        editorState={this.props.editorState}
      />,
      <Picker
        key='Picker'
        isActive={this.props.editorState.shouldShowPicker}
        activePicker={this.props.editorState.activePicker}
        videoPlayer={this.props.videoPlayer}
        editorState={this.props.editorState}
      />,
      <SceneActionsMenu
        key='SceneActionsMenu'
        isActive={this.props.editorState.shouldShowSceneActions}
        editorState={this.props.editorState}
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
