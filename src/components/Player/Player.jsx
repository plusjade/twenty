// import DevTools from 'mobx-react-devtools'
import 'intersection-observer'

import { observer } from "mobx-react"
import { observable, reaction, action } from "mobx"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VideoPlayer from 'lib/VideoPlayer'
import EditorState from 'lib/EditorState'
import Scene from 'components/Scene/Scene'
import Editor from 'components/Editor'
import Overlay from 'components/Overlay/Overlay'
import ActionTap from 'components/ActionTap/ActionTap'
import style from './style'

class Player extends Component {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    video: PropTypes.object.isRequired,
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

    this.editor = observable(
      EditorState(this.videoPlayer),
      {
        setScenesMenu: action,
        setTextEditor: action,
        setPicker: action,
        scenesMenuToggle: action,
        toggleTextEditor: action,
        clearLast: action,
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

  handleOverlayTap = () => {
    this.editor.clearLast()
  }

  handleAddScene = () => {
    this.videoPlayer.addScene()
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

            canEdit={this.props.canEdit}
            editor={this.editor}
          />
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <ActionTap
            onTap={this.handleAddScene}
            bigger
          >
            <div>+</div>
          </ActionTap>
        </div>

        {this.props.canEdit && (
          <Editor
            {...this.props}
            videoPlayer={this.videoPlayer}
            editor={this.editor}
          />
        )}

        {this.editor.shouldShowOverlay && (
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
