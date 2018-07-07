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
    stagedBlockId: PropTypes.string,
    video: PropTypes.object.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    sceneTransition: PropTypes.func.isRequired,
  }

  getStagedBlock = () => (
    this.props.stagedBlockId
    ? this.props.video.getBlock(this.props.stagedBlockId)
    : undefined
  )

  getColor = () => {
    const block = this.getStagedBlock()

    if (block) {
      return this.getStagedColorBlock()
    } else {
      return this.getColorScene()
    }
  }

  onChangeColor = (value) => {
    const block = this.getStagedBlock()

    if (block) {
      this.onChangeColorBlock(value)
    } else {
      this.onChangeColorScene(value)
    }
  }

  getColorScene = () => {
    const defaultColor = -100
    const scene = this.props.getActiveScene()
    if (!scene) { return defaultColor }
    const color = scene.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  }

  onChangeColorScene = (value) => {
    const scene = this.props.getActiveScene()
    if (!scene) { return }
    scene.set('color_hsl', value)
  }

  getStagedColorBlock = () => {
    const defaultColor = -100
    const block = this.getStagedBlock()
    if (!block) { return defaultColor }
    const color = block.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  }

  onChangeColorBlock = (value) => {
    const block = this.getStagedBlock()
    if (!block) { return }
    block.set('color_hsl', value)
  }

  onChangeAlign = (value) => {
    const block = this.getStagedBlock()
    if (!block) { return }
    block.set('align', value)
    block.set('lifecycle', 'replay')
  }

  onChangeSize = (value) => {
    const block = this.getStagedBlock()
    if (!block) { return }
    block.set('size', value)
  }

  getStagedBlockSize = () => {
    const defaultValue = 80
    const block = this.getStagedBlock()
    if (!block) { return defaultValue }
    const value = block.get('size') || defaultValue
    if (!value) { return defaultValue }

    return value
  }

  computeKey = scope => (
    scope + (
      this.getStagedBlock()
        ? this.getStagedBlock().get('id')
        : this.props.getActiveScene().get('id')
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

  render() {
    const scenes = this.props.video.getScenes()

    return ([
      <BlockActionsMenu
        key='BlockActionsMenu'
        isActive={!!this.props.stagedBlockId}
        video={this.props.video}
        editBlock={this.props.editBlock}
        removeBlock={this.props.removeBlock}
        getStagedBlock={this.getStagedBlock}
        stagedBlockId={this.props.stagedBlockId}
        toggleEditText={this.props.toggleEditText}
        unStageBlock={this.props.unStageBlock}
        toggleBottomPanel={this.props.toggleBottomPanel}
      />,
      <TextEditor
        key='TextEditor'
        isActive={this.props.isEditingText}
        video={this.props.video}
        editBlock={this.props.editBlock}
        removeBlock={this.props.removeBlock}
        getStagedBlock={this.getStagedBlock}
        stagedBlockId={this.props.stagedBlockId}
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
        isActive={!this.props.stagedBlockId && !this.props.isBottomPanelActive && !this.props.isAddBlockActive && !this.props.isScenesMenuActive}
        onTap={this.props.blocksMenuToggle}
        scenesMenuToggle={this.props.scenesMenuToggle}
        totalScenes={scenes.length}
        scenePosition={
          this.props.video.getScenePosition(this.props.getActiveScene().get('id'))
        }
        sceneTransition={this.props.sceneTransition}
      />,
    ])
  }
}

export default observer(Radium(Editor))
