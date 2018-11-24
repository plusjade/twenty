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
    canEdit: PropTypes.bool.isRequired,
    isHorizontal: PropTypes.bool,
    isFixed: PropTypes.bool,
    scene: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    videoPlayer: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
  }

  handleTap = () => {
    if (this.props.canEdit) { return }
    this.props.videoPlayer.sceneTransition()
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
    // this.props.editorState.scenesMenuToggle()
    if (this.props.videoPlayer.activeSceneId === this.props.scene.id) {
      this.props.videoPlayer.setActiveSceneId(null)
    } else {
      this.props.videoPlayer.setActiveSceneId(this.props.scene.id)
    }
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
            backgroundColor: this.props.scene.color,
          },
          this.props.isHorizontal && style.isHorizontal,
          this.props.isFixed && style.isFixed,
          (this.props.scene.isActive
            ? style.isActive
            : style.isHidden),
          (this.props.canEdit
            ? style.canEdit
            : style.isPresenting),
          this.props.videoPlayer.isLandscape && style.landscape,
        ]}
      >
        {this.props.scene.dateString && (
          <Hammer onDoubleTap={this.handleTapDate}>
            <div style={style.dateString}>
              {this.props.scene.dateString}
            </div>
          </Hammer>
        )}
        <div
          style={[
            this.props.isDebug && style.isDebug,
            style.boundingSquare,
            !this.props.canEdit && ({
                width: this.props.videoPlayer.dimensions.width,
                height: this.props.videoPlayer.dimensions.height,
            }),
            this.props.videoPlayer.isLandscape && style.boundingLandscape,
            {
              backgroundColor: this.props.scene.color,
            },
          ]}
          ref={this.getBoundaryRef}
        >
          {this.props.blocks.map((block) => {
            const Block = BlocksRegistry.get(block.get('type'))
            if (!Block) {
              const message = `No supported block for type: '${block.get('type')}'`
              throw new TypeError(message)
            }

            return (
              <Block
                key={block.get('id')}
                block={block}
                canEdit={this.props.canEdit}
                videoPlayer={this.props.videoPlayer}
                getBoundary={this.getBoundary}
              />
            )
          })}
        </div>

        {this.props.canEdit && (
          <div style={style.sceneMenu}>
            <ActionTap onTap={this.handleTapSceneMenu}>
              <div>
                {'📝'}
              </div>
            </ActionTap>
          </div>
        )}
      </div>
    )
  }
}

export default observer(Radium(Scene))
