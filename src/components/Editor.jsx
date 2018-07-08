import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import LaunchMenu from 'components/LaunchMenu/LaunchMenu'
import BlocksMenu from 'components/BlocksMenu/BlocksMenu'
import SceneActionsMenu from 'components/SceneActionsMenu/SceneActionsMenu'
import BlockActionsMenu from 'components/BlockActionsMenu/BlockActionsMenu'
import TextEditor from 'components/TextEditor/TextEditor'
import Overlay from 'components/Overlay/Overlay'
import ColorPicker from 'components/ColorPicker/ColorPicker'
import PickerAlign from 'components/PickerAlign/PickerAlign'
import PickerSize from 'components/PickerSize/PickerSize'

class Editor extends Component {
  static propTypes = {
    isEditingText: PropTypes.bool.isRequired,
    isBottomPanelActive: PropTypes.bool.isRequired,
    isAddBlockActive: PropTypes.bool.isRequired,
    isScenesMenuActive: PropTypes.bool.isRequired,
    toggleEditText: PropTypes.func.isRequired,
    toggleBottomPanel: PropTypes.func.isRequired,
    blocksMenuToggle: PropTypes.func.isRequired,
    scenesMenuToggle: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
    videoPlayer: PropTypes.func.isRequired,
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
    switch(this.props.isBottomPanelActive) {
      case 'color': {
        return (
          <ColorPicker
            key={this.props.videoPlayer.computeKey('color')}
            onChange={this.onChangeColor}
            initialValue={this.props.videoPlayer.color()}
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
    const scenes = this.props.video.getScenes()

    return ([
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
      <Overlay
        key='OverlayColorPicker'
        isActive={this.props.isBottomPanelActive}
        onTap={this.props.toggleBottomPanel}
        style={{zIndex: 300}}
      >
        <div style={{flex: '0 0 18vh'}}>
          {this.getBottomPanelContent()}
        </div>
      </Overlay>,
      <BlocksMenu
        key='BlocksMenu'
        isActive={this.props.isAddBlockActive}
        toggleBottomPanel={this.props.toggleBottomPanel}
        blocksMenuToggle={this.props.blocksMenuToggle}
        videoPlayer={this.props.videoPlayer}
      />,
      <SceneActionsMenu
        key='SceneActionsMenu'
        isActive={this.props.isScenesMenuActive}
        video={this.props.video}
        toggleBottomPanel={this.props.toggleBottomPanel}
        scenesMenuToggle={this.props.scenesMenuToggle}
      />,
      <LaunchMenu
        key='LaunchMenu'
        isActive={
          !this.props.isBottomPanelActive
            && !this.props.isAddBlockActive
            && !this.props.isScenesMenuActive
            && !this.props.videoPlayer.block
        }
        onTap={this.props.blocksMenuToggle}
        scenesMenuToggle={this.props.scenesMenuToggle}
        totalScenes={scenes.length}
        scenePosition={this.props.videoPlayer.activeScenePosition}
        videoPlayer={this.props.videoPlayer}
      />,
    ])
  }
}

export default observer(Radium(Editor))
