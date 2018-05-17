import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'gsap/Draggable'
import Hammer from 'react-hammerjs'
import BlockPlayer from 'lib/BlockPlayer'
import {
  typing,
  fadeIn,
  enterLeft
} from './effects'

import style from './style'

Draggable.zIndex = 1
class BlockWords extends PureComponent {
  static propTypes = {
    block: PropTypes.object.isRequired,
    stageBlock: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    sceneTransition: PropTypes.func.isRequired,
  }

  static initialState() {
    return ({
      isActivated: false,
      content: '',
      effect: null,
      positionX: 0,
      positionY: 0,
    })
  }

  state = BlockWords.initialState()

  componentWillMount() {
    this.player = new BlockPlayer({offset: this.props.block.get('offset')})
    reaction(
      () => this.props.block.get('lifecycle'),
      (lifecycle) => {
        if (lifecycle === 'play') {
          if (this.state.hasStarted) {
            this.player.replay()
          } else {
            this.player.play()
          }
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
    this.player.on('tick', this.onTick)
    this.player.on('replay', this.resetState)
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
    this.setState(params)
    if (Object.prototype.hasOwnProperty.call(params, 'positionX')) {
      this.props.block.set('positionX', `${params.positionX.toFixed(2)}px`)
    }

    if (Object.prototype.hasOwnProperty.call(params, 'positionY')) {
      this.props.block.set('positionY', `${params.positionY.toFixed(2)}px`)
    }

    if (Object.prototype.hasOwnProperty.call(params, 'rotation')) {
      this.props.block.set('rotation', `${params.rotation.toFixed(2)}deg`)
    }
  }

  onEnd = () => {
    this.props.block.set('lifecycle', 'end')
  }

  onStart = () => {
    this.setState({
      hasStarted: true,
    }, this.initializeTimeline)
  }

  // TODO: better implementation
  onTick = () => {
    if (this.state.isActivated) { return }
    this.timeline && this.timeline.play()
    this.setState({isActivated: true})
  }

  replay = () => {
    this.resetState()
    this.player.replay()
  }

  initializeTimeline = () => {
    switch (this.props.block.get('effect')) {
      case 'fadeIn': {
        this.timeline = fadeIn(this.nodeText)
        break
      }
      case 'typing': {
        this.timeline = typing(this.nodeText)
        break
      }
      case 'enterLeft': {
        this.timeline = enterLeft(this.nodeText)
        break
      }
      default: {
        this.timeline = fadeIn(this.nodeText)
      }
    }
  }

  getRef = (node) => {
    this.node = node
  }

  getRefText = (node) => {
    this.nodeText = node
  }

  resetState = () => {
    this.setState(BlockWords.initialState())
  }

  handleTap = () => {
    if (this.props.isEditing) {
      this.props.stageBlock(this.props.block.get('id'))
      this.makeDraggable()
    } else {
      this.props.sceneTransition()
    }
  }

  makeDraggable = () => {
    if (this.draggable) { return }
    this.draggable = Draggable.create(this.node, {
      // type: "rotation",
      // bounds: this.props.getBoundary(),
      onDragEnd: this.onDragEnd,
      onDragEndParams: [this.syncTransforms],
    })[0]
  }

  getTransforms() {
    const transforms = []

    if (this.props.block.has('positionX') || this.props.block.has('positionY')) {
      const positionX = this.props.block.get('positionX') || 0
      const positionY = this.props.block.get('positionY') || 0

      if (positionX || positionY) {
        transforms.push(`translate3d(${positionX}, ${positionY}, 0)`)
      }
    } else {
      const position = this.props.block.get('position')
        ? this.props.block.get('position').concat([0]).join(',')
        : 0
      if (position) {
        transforms.push(`translate3d(${position})`)
      }
    }

    return transforms
  }

  getInnerTransforms() {
    const innerTransforms = []
    const rotation = this.props.block.get('rotation') || 0

    if (rotation) {
      innerTransforms.push(`rotate(${rotation})`)
    }

    return innerTransforms
  }

  getContent() {
    const legacyContent = this.props.block.get('data') && this.props.block.get('data').content
    return this.props.block.get('content') || legacyContent
  }

  getColor() {
    let colorHsl = +this.props.block.get('color_hsl') || -100
    if (colorHsl < 1) { // handle grayscale as represented by -100 - 0
      return `hsl(0, 0%, ${(Math.abs(colorHsl))}%)`
    }

    return `hsl(${colorHsl}, 100%, 50%)`
  }

  getSize() {
    const size = +this.props.block.get('size') || 24
    return `${size}px`
  }

  render() {
    const content = this.getContent()
    const transforms = this.getTransforms()
    const innerTransforms = this.getInnerTransforms()

    return (
      <div
        ref={this.getRef}
        style={[
          style.default,
          transforms.length > 0 && {transform: transforms.join(' ')},
          this.props.block.get('lifecycle') !== 'edit' && {zIndex: 1},
        ]}
      >
        <Hammer onTap={this.handleTap}>
          <div
            style={[
              innerTransforms.length > 0 && {transform: innerTransforms.join(' ')}
            ]}
          >
            <h1
              ref={this.getRefText}
              style={[
                style.text,
                {color: this.getColor()},
                {fontSize: this.getSize()},
                this.props.block.get('align') && {textAlign: this.props.block.get('align')},
                this.props.block.get('lifecycle') === 'edit' && style.isEditing,
              ]}
            >
              {this.state.hasStarted && content}
            </h1>
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(observer(BlockWords))
