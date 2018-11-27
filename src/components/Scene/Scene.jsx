import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import BlocksRegistry from 'models/BlocksRegistry'
import ActionTap from 'components/ActionTap/ActionTap'
import { getColor } from 'lib/transforms'

import style from './style'

class Scene extends Component {
  static propTypes = {
    isHorizontal: PropTypes.bool,
    isFixed: PropTypes.bool,
    scene: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    videoPlayer: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
  }

  componentDidMount() {
    if (this.props.scene.isToday()) {
      this.scrollIntoView()
    }
  }

  scrollIntoView = () => {
    if (this.sceneNode) {
      this.sceneNode.scrollIntoView()
    }
  }

  getBoundary = () => {
    return this.boundaryNode
  }

  getBoundaryRef = (node) => {
    if (node) {
      this.boundaryNode = node
    }
  }

  getSceneRef = (node) => {
    if (node) {
      this.sceneNode = node
    }
  }

  handleTapSceneMenu = () => {
    if (this.props.videoPlayer.activeSceneId === this.props.scene.id) {
      this.props.videoPlayer.setActiveSceneId(null)
    } else {
      this.props.videoPlayer.setActiveSceneId(this.props.scene.id)
    }
    this.props.editorState.scenesMenuToggle()
  }

  handleTapDate = () => {
    this.props.videoPlayer.addScene(this.props.scene)
  }

  render() {
    return (
      <div
        id={this.props.scene.id}
        ref={this.getSceneRef}
        style={[
          style.wrap,
          {
            // backgroundColor: this.props.scene.color,
          },
        ]}
      >
        <div
          style={[
            style.boundingSquare,
            {
              backgroundColor: this.props.scene.color,
            },
          ]}
          ref={this.getBoundaryRef}
        >
          {this.props.scene.dateString && (
            <Hammer
              // onDoubleTap={this.handleTapSceneMenu}
              onTap={this.handleTapDate}
            >
              <div
                style={[
                  style.dateString,
                  this.props.scene.isToday() && style.isToday,
                ]}
                title={this.props.scene.id}
              >
                {this.props.scene.dateString}
              </div>
            </Hammer>
          )}

          {this.props.blocks.map((block) => {
            if (!block) { return }
            const Block = BlocksRegistry.get(block.get('type'))
            if (!Block) {
              const message = `No supported block for type: '${block.get('type')}'`
              throw new TypeError(message)
            }

            return (
              <Block
                key={block.get('id')}
                block={block}
                videoPlayer={this.props.videoPlayer}
                getBoundary={this.getBoundary}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default observer(Radium(Scene))
