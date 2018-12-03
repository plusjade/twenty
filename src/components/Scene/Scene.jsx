import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import BlocksRegistry from 'models/BlocksRegistry'
import ActionTap from 'components/ActionTap/ActionTap'
import DateHeading from 'components/DateHeading/DateHeading'
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
        {this.props.scene.dateString && (
          <DateHeading
            label={this.props.scene.dateLabel}
            text={this.props.scene.dateString}
            isToday={this.props.scene.isToday()}
            hasContent
          />
        )}
        <div
          style={[
            style.boundingSquare,
            this.props.scene.isFuture() && style.isFuture,
          ]}
          ref={this.getBoundaryRef}
        >
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
