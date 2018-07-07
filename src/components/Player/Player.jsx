// import DevTools from 'mobx-react-devtools'
import 'intersection-observer'
import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Layer from 'components/Layer/Layer'
import Scene from 'components/Scene/Scene'
import ActionTap from 'components/ActionTap/ActionTap'
import Editor from 'components/Editor'
import style from './style'

class Player extends Component {
  static propTypes = {
    activeSceneId: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,
    stagedBlockId: PropTypes.string,
    video: PropTypes.object.isRequired,
    isEditing: PropTypes.bool,
    sceneTransition: PropTypes.func.isRequired,
    addScene: PropTypes.func.isRequired,
    addBlock: PropTypes.func.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    stageBlock: PropTypes.func.isRequired,
  }

  state = {
    isBottomPanelActive: false,
    isAddBlockActive: false,
    isScenesMenuActive: false,
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  toggleBottomPanel = ({toggle, type} = {}) => {
    const value = toggle === 'close' ? false : !this.state.isBottomPanelActive
    if (value) {
      this.setState({isBottomPanelActive: type})
    } else {
      this.setState({isBottomPanelActive: false})
    }
  }

  blocksMenuToggle = (open) => {
    const value = open === false ? false : !this.state.isAddBlockActive
    this.setState({isAddBlockActive: value})
  }

  scenesMenuToggle = () => {
    this.setState({isScenesMenuActive: !this.state.isScenesMenuActive}, () => {
      if (this.state.isScenesMenuActive) {
        this.props.unStageBlock()
      } else {
        this.toggleBottomPanel({toggle: 'close'})
      }
    })
  }

  render() {
    const scenes = this.props.video.getScenes()
    return (
      <div
        className="app-wrapper"
        style={[
          this.props.isHorizontal && style.horizontalScroll,
          this.props.isHorizontal && {width: `${(scenes.length * 100)}vw`},
        ]}
      >
        {scenes.map(scene => (
          <Scene
            key={`scenes-${scene.get('id')}`}
            canEdit={this.props.canEdit}
            isEditing={this.props.isEditing && scene.get('id') === this.props.activeSceneId}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}
            sceneTransition={this.props.sceneTransition}
            editBlock={this.props.editBlock}
            removeBlock={this.props.removeBlock}
            stageBlock={this.props.stageBlock}
            unStageBlock={this.props.unStageBlock}
            setActiveSceneId={this.props.setActiveSceneId}
          />
        ))}

        {this.props.isEditing && (
          <Editor
            {...this.props}
            {...this.state}
            toggleBottomPanel={this.toggleBottomPanel}
            blocksMenuToggle={this.blocksMenuToggle}
            scenesMenuToggle={this.scenesMenuToggle}
          />
        )}
      </div>
    )
  }
}

export default observer(Radium(Player))
