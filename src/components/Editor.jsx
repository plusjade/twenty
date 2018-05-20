import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import BlocksMenu from 'components/BlocksMenu/BlocksMenu'
import SceneEditor from 'components/SceneEditor/SceneEditor'
import BlockActionsMenu from 'components/BlockActionsMenu/BlockActionsMenu'
import TextEditor from 'components/TextEditor/TextEditor'
import BottomPanel from 'components/BottomPanel/BottomPanel'
import ColorPicker from 'components/ColorPicker/ColorPicker'
import ActionTap from 'components/ActionTap/ActionTap'

class Editor extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    stagedBlockId: PropTypes.string,
    video: PropTypes.object.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
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
    const scene = this.props.video.getScene(this.props.activeSceneId)
    if (!scene) { return defaultColor }
    const color = scene.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  }

  onChangeColorScene = (value) => {
    const scene = this.props.video.getScene(this.props.activeSceneId)
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

  handleAddBlock = () => {
    this.props.toggleAddBlock()
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
      <BlocksMenu
        key='BlocksMenu'
        isEditing={this.props.isEditing}
        addBlock={this.props.addBlock}
        toggleBottomPanel={this.props.toggleBottomPanel}
        toggleAddBlock={this.props.toggleAddBlock}
        isActive={this.props.isAddBlockActive}
        addScene={this.props.addScene}
      />,
      <SceneEditor
        key='SceneEditor'
        activeSceneId={this.props.activeSceneId}
        video={this.props.video}
        isEditing={this.props.isEditing}
        addScene={this.props.addScene}
        unStageBlock={this.props.unStageBlock}
        sceneTransition={this.props.sceneTransition}
        totalScenes={scenes.length}
        scenePosition={this.props.video.getScenePosition(this.props.activeSceneId)}
        toggleBottomPanel={this.props.toggleBottomPanel}
      />,
      <BottomPanel
        key='BottomPanel'
        isActive={this.props.isBottomPanelActive}
        toggleBottomPanel={this.props.toggleBottomPanel}
      >
        <div style={{flex: 1, marginBottom: 5}}>
          <ColorPicker
            key={
              this.getStagedBlock()
                ? this.getStagedBlock().get('id')
                : this.props.activeSceneId
            }
            onChange={this.onChangeColor}
            initialValue={this.getColor()}
          />
        </div>
      </BottomPanel>,
      <div
        key='AddBlock'
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <ActionTap onTap={this.handleAddBlock}>
          <div>+</div>
        </ActionTap>
      </div>
    ])
  }
}

export default observer(Radium(Editor))
