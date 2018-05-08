import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import BlockPlayer from 'lib/BlockPlayer'
import {
  typing,
  fadeIn,
  enterLeft
} from './effects'

import style from './style'

class BlockWords extends PureComponent {
  static propTypes = {
    block: PropTypes.object.isRequired,
  }

  static initialState() {
    return ({
      isActivated: false,
      entry: {},
      position: [],
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
      }
    )
  }

  componentDidMount() {
    this.player.on('start', this.onStart)
    this.player.on('end', this.onEnd)
    this.player.on('tick', this.onTick)
    this.player.on('replay', this.resetState)
    window.Draggable.create(this.node, {
      // type: "rotation",
      onDragEnd: this.onDragEnd,
      onDragEndParams: [this.syncTransforms],
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isEditing && this.props.isEditing) {
      this.setState({edit: false})
    }
  }

  onDragEnd(syncTransforms) {
    if (this.rotation) {
      syncTransforms({rotation: this.rotation})
    } else {
      syncTransforms({position: [this.endX, this.endY]})
    }
  }

  syncTransforms = (params) => {
    this.setState(params)
    if (params.position) {
      this.props.block.set('position', [`${params.position[0].toFixed(2)}px`, `${params.position[1].toFixed(2)}px`])
    } else if (params.rotation) {
      this.props.block.set('rotation', `${params.rotation.toFixed(2)}deg`)
    }
  }

  onEnd = () => {
    this.props.block.set('lifecycle', 'end')
  }

  onStart = () => {
    const entry = this.props.block.get('data') || {}
    this.setState({
      hasStarted: true,
      entry,
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
    switch (this.state.entry.effect) {
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

  handleTapEdit = () => {
    this.props.stageBlock(this.props.block.get('id'))
  }

  handleSubmitEdit = (value) => {
    this.setState({edit: false}, () => {
      this.props.editBlock(this.props.block.get('id'), {content: value})
    })
  }

  render() {
    const transforms = []
    const innerTransforms = []
    const position = this.props.block.get('position')
      ? this.props.block.get('position').concat([0]).join(',')
      : 0
    const rotation = this.props.block.get('rotation') || 0
    const scale = this.props.block.get('scale') || 0
    if (position) {
      transforms.push(`translate3d(${position})`)
    }
    if (scale) {
      innerTransforms.push(`scale(${scale})`)
    }
    if (rotation) {
      innerTransforms.push(`rotate(${rotation})`)
    }

    return (
      <div
        ref={this.getRef}
        style={[
          style.default,
          transforms.length > 0 && {transform: transforms.join(' ')}
        ]}
      >
        <Hammer
          onTap={this.handleTapEdit}
        >
          <div
            style={[
              innerTransforms.length > 0 && {transform: innerTransforms.join(' ')}
            ]}
          >
          <h1
            ref={this.getRefText}
            style={[
              style.text,
              this.props.block.get('style'),
              this.props.isEditing && style.isEditing,
              this.props.block.get('lifecycle') === 'edit' && ({display: 'none'}),
            ]}
          >
            {this.state.entry.content}
          </h1>
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(observer(BlockWords))
