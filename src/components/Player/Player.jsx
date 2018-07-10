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
import Overlay from 'components/Overlay/Overlay'
import style from './style'

class Player extends Component {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    video: PropTypes.object.isRequired,
  }

  state = {
    isBottomPanelActive: false,
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
        this.videoPlayer.activeBlocks.forEach((block) => {
          block.set('lifecycle', 'play')
        })

        if (lastSceneId) {
          props.video.getBlocksInScene(lastSceneId).forEach((block) => {
            block.set('lifecycle', 'sleep')
          })
        }

        if (props.canEdit) {
          this.videoPlayer.unStageBlock()
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

  toggleBottomPanel = ({toggle, type} = {}) => {
    const value = toggle === 'close' ? false : !this.state.isBottomPanelActive
    if (value) {
      this.setState({isBottomPanelActive: type})
    } else {
      this.setState({isBottomPanelActive: false})
    }
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

  showOverlay = () => (
    this.state.isBottomPanelActive
      || this.state.isScenesMenuActive
      || this.videoPlayer.block
  )

  handleOverlayTap = () => {
    if (this.state.isScenesMenuActive) {
      this.scenesMenuToggle()
    } else if (this.state.isBottomPanelActive) {
      this.toggleBottomPanel()
    } else {
      this.videoPlayer.unStageBlock()
    }
  }

  render() {
    const scenes = this.props.video.getScenes()
    return (
      <div
        className="app-wrapper"
        style={[
          this.props.isHorizontal && style.horizontalScroll,
          this.props.isHorizontal && {width: `${(scenes.length * 100)}vw`},
          this.props.canEdit && style.canEdit
        ]}
      >
        {scenes.map(scene => (
          <Scene
            key={`scenes-${scene.get('id')}`}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}
            videoPlayer={this.videoPlayer}

            scenesMenuToggle={this.scenesMenuToggle}
            canEdit={this.props.canEdit}
          />
        ))}

        {this.props.canEdit && (
          <Editor
            {...this.props}
            {...this.state}

            videoPlayer={this.videoPlayer}

            toggleEditText={this.toggleEditText}
            toggleBottomPanel={this.toggleBottomPanel}
            scenesMenuToggle={this.scenesMenuToggle}
          />
        )}
        {this.showOverlay() && (
          <Overlay
            key='OverlayColorPicker'
            onTap={this.handleOverlayTap}
            style={{
              position: 'fixed',
              height: '133vw',
              width: '100vw',
            }}
            isActive
          />
        )}
      </div>
    )
  }
}

export default observer(Radium(Player))
