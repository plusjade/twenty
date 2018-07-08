// import DevTools from 'mobx-react-devtools'
import 'intersection-observer'

import { observer } from "mobx-react"
import { observable, reaction, action } from "mobx"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VideoPlayer from 'lib/VideoPlayer'
import Scene from 'components/Scene/Scene'
import Editor from 'components/Editor'
import style from './style'

class Player extends Component {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    video: PropTypes.object.isRequired,
  }

  state = {
    isBottomPanelActive: false,
    isAddBlockActive: false,
    isScenesMenuActive: false,
  }

  constructor(props) {
    let lastSceneId
    super(props)

    this.videoPlayer = observable(
      VideoPlayer(props.video, props.video.getInitialSceneId()),
      {
        setActiveSceneId: action,
        stageBlock: action,
        unStageBlock: action,
      }
    )

    reaction(
      () => this.videoPlayer.activeSceneId,
      (activeSceneId) => {
        if (props.canEdit) {
          this.videoPlayer.unStageBlock()
        }

        this.videoPlayer.activeBlocks.forEach((block) => {
          block.set('lifecycle', 'play')
        })

        if (lastSceneId) {
          props.video.getBlocksInScene(lastSceneId).forEach((block) => {
            block.set('lifecycle', 'sleep')
          })
        }

        lastSceneId = activeSceneId
      }
    )
  }

  toggleEditText = () => {
    this.setState({
      isEditingText: !this.state.isEditingText,
    })
  }

  handleTapRight = () => {
    this.videoPlayer.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.videoPlayer.sceneTransition({option: 'prev'})
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
        this.videoPlayer.unStageBlock()
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
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}
            videoPlayer={this.videoPlayer}

            canEdit={this.props.canEdit}
            isEditing={this.props.canEdit && scene.get('id') === this.videoPlayer.activeSceneId}
          />
        ))}

        {this.props.canEdit && (
          <Editor
            {...this.props}
            {...this.state}

            videoPlayer={this.videoPlayer}
            isEditing={this.props.canEdit}

            toggleEditText={this.toggleEditText}
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
