import { observer } from "mobx-react"
import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import Layer from 'components/Layer/Layer'
import StartOverlay from 'components/StartOverlay'
import Scene from 'components/Scene'
import BottomPanel from 'components/BottomPanel/BottomPanel'
import EnterText from 'components/EnterText/EnterText'
import BlockEditor from 'components/BlockEditor/BlockEditor'
import SceneEditor from 'components/SceneEditor/SceneEditor'
import EditorButton from 'components/EditorButton/EditorButton'

const style = {
  wrap: {
    position: "fixed",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  edit: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 21,
    display: "flex",
    flexDirection: "column",
  },
}

class Player extends PureComponent {
  static propTypes = {
    activeSceneId: PropTypes.string,
    video: PropTypes.object.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    timeDuration: PropTypes.number.isRequired,
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapEdit = () => {
    this.props.toggleEditMode()
  }

  onEnterText = (value) => {
    this.props.editBlock({content: value})
  }

  // Only show overlay state on initial load lifecycle
  // i.e. before video is loaded/played for first time
  showStartOverlay = () => (
    false
  )

  render() {
    const scenes = this.props.video.getScenes()
    return (
      <div id="app-wrapper" style={style.wrap}>
        {scenes.map(scene => (
          <Scene
            key={`scenes-${scene.get('id')}`}
            isActive={scene.get('id') === this.props.activeSceneId}
            isEditing={this.props.isEditing && scene.get('id') === this.props.activeSceneId}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}
            sceneTransition={this.props.sceneTransition}
            editBlock={this.props.editBlock}
            stageBlock={this.props.stageBlock}
            removeBlock={this.props.removeBlock}
          />
        ))}

        <Hammer onTap={this.handleTapLeft}>
          <Layer
            isHidden={this.props.isInteractive}
            style={{right: "80%"}}
          />
        </Hammer>

        <Hammer onTap={this.handleTapRight}>
          <Layer
            isHidden={this.props.isInteractive}
            style={{left: "20%"}}
          />
        </Hammer>

        <BlockEditor
          isEditing={this.props.isEditing}
          addBlock={this.props.addBlock}
        />

        <div style={style.edit}>
          {this.props.isEditing && (
            <EditorButton onTap={this.handleTapEdit}>
              <div>{"✔"}</div>
            </EditorButton>
          )}
          {!this.props.isEditing && (
            <EditorButton onTap={this.handleTapEdit}>
              <div>{"✐"}</div>
            </EditorButton>
          )}
        </div>

        <SceneEditor
          isEditing={this.props.isEditing}
          addScene={this.props.addScene}
          sceneTransition={this.props.sceneTransition}
          totalScenes={scenes.length}
          scenePosition={this.props.video.getScenePosition(this.props.activeSceneId)}
        />

        <BottomPanel isActive={this.props.editBlockId}>
          <EnterText
            value={this.props.editBlockContent}
            onSubmit={this.onEnterText}
          />
        </BottomPanel>
      </div>
    )
  }
}

export default Radium(observer(Player))
