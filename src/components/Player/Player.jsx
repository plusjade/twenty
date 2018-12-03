// import DevTools from 'mobx-react-devtools'
import 'intersection-observer'

import { observer } from "mobx-react"
import { observable, reaction, action } from "mobx"
import Radium from 'radium'
import { DateTime } from 'luxon'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VideoPlayer from 'models/VideoPlayer'
import EditorState from 'models/EditorState'

import Scene from 'components/Scene/Scene'
import Editor from 'components/Editor'
import Overlay from 'components/Overlay/Overlay'
import ActionTap from 'components/ActionTap/ActionTap'
import DateCard from 'components/DateCard/DateCard'
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
      VideoPlayer(props.video, props.video.getInitialSceneId(), props.canEdit),
      {
        setActiveSceneId: action,
        stageBlock: action,
        unStageBlock: action,
        setDimensions: action,
      }
    )

    this.editorState = observable(
      EditorState(this.videoPlayer),
      {
        setScenesMenu: action,
        setPicker: action,
        scenesMenuToggle: action,
        clearLast: action,
      }
    )

    reaction(
      () => this.videoPlayer.blockId,
      (blockId) => {
        // const type = blockId ? 'color' : false
        // this.editorState.setPicker({type})
      }
    )

    reaction(
      () => this.videoPlayer.activeSceneId,
      (activeSceneId) => {
        if (activeSceneId) {
          const scene = props.video.getScene(activeSceneId)
          scene.isActive = true
        }

        if (lastSceneId) {
          const scene = props.video.getScene(lastSceneId)
          scene.isActive = false
        }

        this.videoPlayer.unStageBlock()

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
    this.editorState.clearLast()
  }

  getRefNode = (node) => {
    if (node) {
      this.node = node
    }
  }

  render() {
    return (
      <div
        ref={this.getRefNode}
        className="app-wrapper"
        style={[
          style.appWrapper,
          this.props.canEdit && style.canEdit
        ]}
      >
        {this.videoPlayer.dates.map(date => (
          date.scene ? (
            <Scene
              key={`scenes-${date.scene.id}`}
              scene={date.scene}
              blocks={this.props.video.getBlocksInScene(date.scene.id)}
              videoPlayer={this.videoPlayer}
              editorState={this.editorState}
              isDebug={this.props.isDebug}
            />
          ) : (
            <DateCard
              key={`date-${date.dateId}`}
              dateString={date.dateString}
              date={date.date}
              videoPlayer={this.videoPlayer}
            />
          )
        ))}

        {this.props.canEdit && (
          <Editor
            blocksRegistry={this.props.blocksRegistry}
            videoPlayer={this.videoPlayer}
            editorState={this.editorState}
          />
        )}

        {this.editorState.shouldShowOverlay && (
          <Overlay
            onTap={this.handleOverlayTap}
            style={{
              position: 'fixed',
              height: '60vh',
              width: '100vw',
              background: 'rgba(0,0,0,0.5)'
            }}
            isActive
          />
        )}
      </div>
    )
  }
}

export default observer(Radium(Player))
