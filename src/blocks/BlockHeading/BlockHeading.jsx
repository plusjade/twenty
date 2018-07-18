import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'gsap/Draggable'
import Hammer from 'react-hammerjs'
import BlockPlayer from 'lib/BlockPlayer'
import {
  getColor,
  getTextContent,
  getFontSize,
  getTextAlign,
  getTransforms,
  getRotationTransforms,
  syncTransforms,
} from 'lib/transforms'
import { getTextEffect } from './effects'

import style from './style'

// Draggable.zIndex = 1
class BlockHeading extends Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    videoPlayer: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.player = new BlockPlayer({offset: props.block.get('offset')})
    reaction(
      () => props.block.get('lifecycle'),
      (lifecycle) => {
        if (lifecycle === 'play') {
          this.player.play()
        } else if (lifecycle === 'replay') {
          this.player.replay()
        } else if (lifecycle === 'playing') {
          this.timeline && this.timeline.play()
        }

        if (lifecycle === 'edit') {
          this.draggable && this.draggable.enable()
        } else {
          this.draggable && this.draggable.disable()
        }
      }
    )
  }

  componentDidMount() {
    this.player.on('start', this.onStart)
    this.player.on('end', this.onEnd)
  }

  onStart = () => {
    // this.initializeTimeline()
    this.props.block.set('lifecycle', 'playing')
  }

  onEnd = () => {
    this.player.reset()
    this.props.block.set('lifecycle', 'end')
  }

  initializeTimeline = () => {
    this.timeline = (
      getTextEffect({
        block: this.props.block,
        node: this.nodeText
      })
    )
  }

  getRef = (node) => {
    this.node = node
  }

  getRefText = (node) => {
    this.nodeText = node
  }

  makeDraggable = () => {
    if (this.draggable) { return }
    this.draggable = Draggable.create(this.node, {
      type: 'y',
      bounds: this.props.getBoundary(),
      onDragEnd: this.onDragEnd,
      onDragEndParams: [this.syncTransforms],
    })[0]
  }

  onDragEnd(syncTransforms) {
    if (this.rotation) {
      syncTransforms({rotation: this.rotation})
    } else {
      syncTransforms({
        positionX: this.endX,
        positionY: this.endY,
      })
    }
  }

  syncTransforms = (params) => {
    const {height, width} = this.props.videoPlayer.dimensions
    syncTransforms({
      block: this.props.block,
      params,
      height,
      width,
    })
  }

  getTransforms() {
    const {height, width} = this.props.videoPlayer.dimensions
    return getTransforms({block: this.props.block, width, height})
  }

  handleTap = () => {
    if (this.props.canEdit) {
      this.props.videoPlayer.stageBlock(this.props.block.get('id'))

      this.makeDraggable()
    } else {
      this.props.videoPlayer.sceneTransition()
    }
  }

  render() {
    const content = getTextContent(this.props.block)
    const transforms = this.getTransforms()
    const rotationTransforms = getRotationTransforms(this.props.block)

    return (
      <div
        id={`block_${this.props.block.get('id')}`}
        ref={this.getRef}
        style={[
          style.default,
          (transforms.length > 0
            ? {transform: transforms.join(' ')}
            : style.isSmartCentered
          ),
          this.props.block.get('lifecycle') !== 'edit' && {zIndex: 1},
        ]}
      >
        <Hammer onTap={this.handleTap}>
          <div
            style={[
              rotationTransforms.length > 0 && {transform: rotationTransforms.join(' ')}
            ]}
          >
            <h1
              ref={this.getRefText}
              style={[
                style.text,
                {
                  color: getColor(this.props.block),
                  fontSize: getFontSize(this.props.block),
                  textAlign: getTextAlign(this.props.block),
                },
                this.props.block.get('lifecycle') === 'edit' && style.isStaged,
              ]}
            >
              {content.map((string, i) => (
                <span key={i} style={{display: 'block'}}>
                  {string}
                </span>
              ))}
            </h1>
          </div>
        </Hammer>
      </div>
    )
  }
}

export default observer(Radium(BlockHeading))
