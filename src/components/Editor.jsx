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
    isActive: PropTypes.bool,
    video: PropTypes.object.isRequired,
    stage: PropTypes.object.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    sceneTransition: PropTypes.func.isRequired,
  }

  getColor = () => {
    const block = this.props.stage.block

    if (block) {
      return this.getStagedColorBlock()
    } else {
      return this.getColorScene()
    }
  }

  onChangeColor = (value) => {
    const block = this.props.stage.block

    if (block) {
      this.onChangeColorBlock(value)
    } else {
      this.onChangeColorScene(value)
    }
  }

  getColorScene = () => {
    const defaultColor = -100
    const scene = this.props.player.activeScene
    if (!scene) { return defaultColor }
    const color = scene.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  }

  onChangeColorScene = (value) => {
    const scene = this.props.player.activeScene
    if (!scene) { return }
    scene.set('color_hsl', value)
  }

  getStagedColorBlock = () => {
    const defaultColor = -100
    const block = this.props.stage.block
    if (!block) { return defaultColor }
    const color = block.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  }

  onChangeColorBlock = (value) => {
    const block = this.props.stage.block
    if (!block) { return }
    block.set('color_hsl', value)
  }

  onChangeAlign = (value) => {
    const block = this.props.stage.block
    if (!block) { return }
    block.set('align', value)
    block.set('lifecycle', 'replay')
  }

  onChangeSize = (value) => {
    const block = this.props.stage.block
    if (!block) { return }
    block.set('size', value)
  }

  getStagedBlockSize = () => {
    const defaultValue = 80
    const block = this.props.stage.block
    if (!block) { return defaultValue }
    const value = block.get('size') || defaultValue
    if (!value) { return defaultValue }

    return value
  }

  computeKey = scope => (
    scope + (
      this.props.stage.block
        ? this.props.stage.block.get('id')
        : this.props.player.activeSceneId
    )
  )

  getBottomPanelContent() {
    switch(this.props.isBottomPanelActive) {
      case 'color': {
        return (
          <ColorPicker
            key={this.computeKey('color')}
            onChange={this.onChangeColor}
            initialValue={this.getColor()}
          />
        )
      }
      case 'align': {
        return (
          <PickerAlign
            key={this.computeKey('align')}
            onChange={this.onChangeAlign}
          />
        )
      }
      case 'size': {
        return (
          <PickerSize
            key={this.computeKey('size')}
            onChange={this.onChangeSize}
            initialValue={this.getStagedBlockSize()}
          />
        )
      }
      default: {
        return null
      }
    }
  }

  hasStagedBlock = () => !!this.props.stage.block

  render() {
    const scenes = this.props.video.getScenes()

    return ([
      <BlockActionsMenu
        key='BlockActionsMenu'
        isActive={!!this.hasStagedBlock()}
        video={this.props.video}
        editBlock={this.props.editBlock}
        removeBlock={this.props.removeBlock}
        stage={this.props.stage}
        toggleEditText={this.props.toggleEditText}
        toggleBottomPanel={this.props.toggleBottomPanel}
      />,
      <TextEditor
        key='TextEditor'
        isActive={this.props.isEditingText}
        video={this.props.video}
        editBlock={this.props.editBlock}
        removeBlock={this.props.removeBlock}
        stage={this.props.stage}
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
        isEditing={this.props.isEditing}
        addBlock={this.props.addBlock}
        toggleBottomPanel={this.props.toggleBottomPanel}
        blocksMenuToggle={this.props.blocksMenuToggle}

        addScene={this.props.addScene}
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
        isActive={!this.hasStagedBlock() && !this.props.isBottomPanelActive && !this.props.isAddBlockActive && !this.props.isScenesMenuActive}
        onTap={this.props.blocksMenuToggle}
        scenesMenuToggle={this.props.scenesMenuToggle}
        totalScenes={scenes.length}
        scenePosition={this.props.player.activeScenePosition}
        sceneTransition={this.props.sceneTransition}
      />,
    ])
  }
}

export default observer(Radium(Editor))
