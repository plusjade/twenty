import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import BlockList from 'components/BlockList/BlockList'
import SceneEditor from 'components/SceneEditor/SceneEditor'
import EditorButton from 'components/EditorButton/EditorButton'
import BlockWordsEditor from 'components/BlockWordsEditor/BlockWordsEditor'
import TextEditor from 'components/TextEditor/TextEditor'
import BottomPanel from 'components/BottomPanel/BottomPanel'
import ColorPicker from 'components/ColorPicker/ColorPicker'

class Editor extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    stagedBlockId: PropTypes.string,
    video: PropTypes.object.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    getStagedBlock: PropTypes.func.isRequired,
  }

  render() {
    const scenes = this.props.video.getScenes()

    return ([
      <BlockWordsEditor
        key='BlockWordsEditor'
        isActive={!!this.props.stagedBlockId}
        video={this.props.video}
        editBlock={this.props.editBlock}
        removeBlock={this.props.removeBlock}
        getStagedBlock={this.props.getStagedBlock}
        stagedBlockId={this.props.stagedBlockId}
        toggleEditText={this.props.toggleEditText}
        toggleBottomPanel={this.props.toggleBottomPanel}
      />,
      <TextEditor
        key='TextEditor'
        isActive={this.props.isEditingText}
        video={this.props.video}
        editBlock={this.props.editBlock}
        removeBlock={this.props.removeBlock}
        getStagedBlock={this.props.getStagedBlock}
        stagedBlockId={this.props.stagedBlockId}
        toggleEditText={this.props.toggleEditText}
      />,
      <BlockList
        key='BlockList'
        isEditing={this.props.isEditing}
        addBlock={this.props.addBlock}
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
      >
        <ColorPicker
          key={
            this.props.getStagedBlock()
              ? this.props.getStagedBlock().get('id')
              : this.props.activeSceneId
          }
          onChange={this.props.onChangeColor}
          initialValue={this.props.getColor()}
        />
      </BottomPanel>
    ])
  }
}

export default observer(Radium(Editor))
