// import DevTools from 'mobx-react-devtools'
import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Scene from 'components/Scene/Scene'
import EditorButton from 'components/EditorButton/EditorButton'
import Editor from 'components/Editor'
import style from './style'

class Player extends Component {
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

  state = {
    isBottomPanelActive: false
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapHome = () => {
    window.location = '/'
  }

  toggleBottomPanel = (open) => {
    const value = open === false ? false : !this.state.isBottomPanelActive
    this.setState({isBottomPanelActive: value})
  }

  render() {
    const scenes = this.props.video.getScenes()
    return (
      <div className="app-wrapper" style={[style.wrap, this.props.isEditing && {position: 'fixed'}]}>
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

        <div style={style.edit}>
          <EditorButton
            onTap={this.handleTapHome}
            dark
          >
            <div>{"🏠"}</div>
          </EditorButton>
        </div>

        {!this.props.isEditing && (
          <div style={style.back}>
            <EditorButton
              onTap={this.handleTapLeft}
              disabled={this.props.video.getScenePosition(this.props.activeSceneId) <= 1}
              bigger
            >
              <div style={{transform: "rotate(180deg)"}}>
                {"➜"}
              </div>
            </EditorButton>
          </div>
        )}

        {this.props.isEditing && (
          <Editor
            {...this.props}
            toggleBottomPanel={this.toggleBottomPanel}
            isBottomPanelActive={this.state.isBottomPanelActive}
          />
        )}
      </div>
    )
  }
}

export default observer(Radium(Player))
