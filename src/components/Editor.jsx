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
      </Overlay>,
      <BlocksMenu
        key='BlocksMenu'
        isEditing={this.props.isEditing}
        addBlock={this.props.addBlock}
        toggleBottomPanel={this.props.toggleBottomPanel}
        blocksMenuToggle={this.props.blocksMenuToggle}
        isActive={this.props.isAddBlockActive}
        addScene={this.props.addScene}
      />,
      <SceneActionsMenu
        key='SceneActionsMenu'
        isActive={this.props.isScenesMenuActive}
        activeSceneId={this.props.activeSceneId}
        video={this.props.video}
        addScene={this.props.addScene}
        unStageBlock={this.props.unStageBlock}
        sceneTransition={this.props.sceneTransition}
        totalScenes={scenes.length}
        scenePosition={this.props.video.getScenePosition(this.props.activeSceneId)}
        toggleBottomPanel={this.props.toggleBottomPanel}
        scenesMenuToggle={this.props.scenesMenuToggle}
      />,
      <LaunchMenu
        key='LaunchMenu'
        onTap={this.props.blocksMenuToggle}
        scenesMenuToggle={this.props.scenesMenuToggle}
        totalScenes={scenes.length}
        scenePosition={this.props.video.getScenePosition(this.props.activeSceneId)}
      />,
    ])
  }
}

export default observer(Radium(Editor))
