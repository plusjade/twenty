// import DevTools from 'mobx-react-devtools'
import 'intersection-observer'

import { observer } from "mobx-react"
import { observable, reaction, action } from "mobx"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VideoPlayer from 'models/VideoPlayer'
import EditorState from 'models/EditorState'

import Scene from 'components/Scene/Scene'
import Editor from 'components/Editor'
import Overlay from 'components/Overlay/Overlay'
import ActionTap from 'components/ActionTap/ActionTap'
import style from './style'

class Player extends Component {
  static propTypes = {
    canEdit: PropTypes.bool,
    isEmbed: PropTypes.bool,
    isDebug: PropTypes.bool,
    video: PropTypes.object.isRequired,
    blocksRegistry: PropTypes.array,
  }

  static defaultProps = {
    canEdit: false,
    isEmbed: false,
    isDebug: false,
    blocksRegistry: [],
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
        setDimensions: action,
      }
    )

    this.editor = observable(
      EditorState(this.videoPlayer),
      {
        setScenesMenu: action,
        setPicker: action,
        scenesMenuToggle: action,
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

  componentDidMount() {
    this.setDimensions()
    window.addEventListener('resize', this.setDimensions)
  }

  setDimensions = () => {
    const viewport = document.body.getBoundingClientRect()
    const container = this.props.isEmbed
                      ? this.node
                      : document.body
    const {height, width} = container.getBoundingClientRect()
    let orientation = 'portrait'

    if (!this.props.isEmbed && viewport.width > viewport.height) {
      orientation = 'landscape'
    }

    this.videoPlayer.setDimensions({orientation, width, height})
  }

  handleOverlayTap = () => {
    this.editor.clearLast()
  }

  handleAddScene = () => {
    this.videoPlayer.addScene()
  }

  getRefNode = (node) => {
    if (node) {
      this.node = node
    }
  }

  render() {
    const scenes = this.props.video.getScenes()
    return (
      <div
        ref={this.getRefNode}
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
            isDebug={this.props.isDebug}
          />
        ))}
        {this.props.canEdit && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <ActionTap
              onTap={this.handleAddScene}
              style={{zIndex: 100}}
              bigger
            >
              <div>+</div>
            </ActionTap>
          </div>
        )}

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
