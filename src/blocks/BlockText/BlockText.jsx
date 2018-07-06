import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'gsap/Draggable'
import BlockPlayer from 'lib/BlockPlayer'
import Hammer from 'react-hammerjs'
import {
  getColor,
  getTextContent,
  getFontSize,
  getTextAlign,
  getTransforms,
  getRotationTransforms,
  syncTransforms,
} from 'lib/transforms'
import style from './style'

class BlockText extends Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    sceneTransition: PropTypes.func.isRequired,
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
    this.props.block.set('lifecycle', 'playing')
  }

  onEnd = () => {
    this.player.reset()
    this.props.block.set('lifecycle', 'end')
  }

  getRef = (node) => {
    this.node = node
  }

  resetState = () => {
    this.setState(BlockText.initialState())
  }

  makeDraggable = () => {
    if (this.draggable) { return }
    this.draggable = Draggable.create(this.node, {
      bounds: this.props.getBoundary(),
      onDragEnd: this.onDragEnd,
      onDragEndParams: [this.syncTransforms],
    })[0]
  }

  onDragEnd(syncTransforms) {
    syncTransforms({
      positionX: this.endX,
      positionY: this.endY,
    })
  }

  syncTransforms = (params) => {
    const {height, width} = this.props.getBoundary().getBoundingClientRect()
    syncTransforms({
      block: this.props.block,
      params,
      height,
      width,
    })
  }

  getTransforms() {
    const node = this.props.getBoundary() || document.body
    const {height, width} = node.getBoundingClientRect()
    return getTransforms({block: this.props.block, width, height})
  }

  isActive() {
    return true
    return ['playing', 'end', 'edit'].includes(this.props.block.get('lifecycle'))
  }

  handleTap = () => {
    if (this.props.isEditing) {
      this.props.stageBlock(this.props.block.get('id'))
      this.makeDraggable()
    } else {
      this.props.sceneTransition()
    }
  }

  render() {
    const content = getTextContent(this.props.block)
    const transforms = this.getTransforms()

    return (
      <div
        id={`block_${this.props.block.get('id')}`}
        ref={this.getRef}
        style={[
          style.default,
          {
            color: getColor(this.props.block),
            // fontSize: getFontSize(this.props.block),
            textAlign: getTextAlign(this.props.block),
          },
          this.props.block.get('lifecycle') === 'edit' && style.isEditing,
          (transforms.length > 0
            ? {transform: transforms.join(' ')}
            : style.isSmartCentered
          ),
        ]}
      >
        <Hammer onTap={this.handleTap}>
          <div
            style={[
              style.textWrap,
              this.isActive() && style.isActive
            ]}
          >
            {content.map((string, i) => (
              <p key={i}>
                {string}
              </p>
            ))}
          </div>
        </Hammer>
      </div>
    )
  }
}

export default observer(Radium(BlockText))
