// import DevTools from 'mobx-react-devtools'
import { observer } from "mobx-react"
import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import Layer from 'components/Layer/Layer'
import Scene from 'components/Scene'
import BlockList from 'components/BlockList/BlockList'
import SceneEditor from 'components/SceneEditor/SceneEditor'
import EditorButton from 'components/EditorButton/EditorButton'
import BlockWordsEditor from 'components/BlockWordsEditor/BlockWordsEditor'

const style = {
  wrap: {
    position: "fixed",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  edit: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
  },
}

class Player extends PureComponent {
  static propTypes = {
    activeSceneId: PropTypes.string.isRequired,
    stagedBlockId: PropTypes.string,
    video: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    addScene: PropTypes.func.isRequired,
    addBlock: PropTypes.func.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    stageBlock: PropTypes.func.isRequired,
  }

  getStagedBlock = () => (
    this.props.stagedBlockId
    ? this.props.video.getBlock(this.props.stagedBlockId)
    : undefined
  )

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapHome = () => {
    window.location = '/'
  }

  render() {
    const scenes = this.props.video.getScenes()
    return (
      <div className="app-wrapper" style={style.wrap}>
        {scenes.map(scene => (
          <Scene
            key={`scenes-${scene.get('id')}`}
            isActive={scene.get('id') === this.props.activeSceneId}
            isEditing={this.props.isEditing && scene.get('id') === this.props.activeSceneId}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}
            sceneTransition={this.props.sceneTransition}
            editBlock={this.props.editBlock}
            removeBlock={this.props.removeBlock}
            stageBlock={this.props.stageBlock}
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

        <BlockWordsEditor
          isActive={!!this.props.stagedBlockId}
          editBlock={this.props.editBlock}
          removeBlock={this.props.removeBlock}
          getStagedBlock={this.getStagedBlock}
        />

        <BlockList
          isEditing={this.props.isEditing}
          addBlock={this.props.addBlock}
        />

        <div style={style.edit}>
          <EditorButton
            onTap={this.handleTapHome}
            dark
          >
            <div>{"🏠"}</div>
          </EditorButton>
        </div>

        <SceneEditor
          isEditing={this.props.isEditing}
          addScene={this.props.addScene}
          sceneTransition={this.props.sceneTransition}
          totalScenes={scenes.length}
          scenePosition={this.props.video.getScenePosition(this.props.activeSceneId)}
        />
      </div>
    )
  }
}

export default Radium(observer(Player))
