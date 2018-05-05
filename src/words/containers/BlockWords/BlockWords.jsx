import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import EnterText from 'components/EnterText/EnterText'
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
      onDragEnd: this.onDragEnd,
      onDragEndParams: [this.syncPosition],
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isEditing && this.props.isEditing) {
      this.setState({edit: false})
    }
  }

  onDragEnd(syncPosition) {
    syncPosition({position: [this.endX, this.endY]})

  }

  syncPosition = (params) => {
    this.setState(params)
    this.props.block.set('position', [`${params.position[0]}px`, `${params.position[1]}px`])
  }

  onEnd = () => {
    this.props.block.set('lifecycle', 'end')
  }

  onStart = () => {
    console.log('ON START', this.props.block.get('id'))
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
    this.setState({edit: !this.state.edit})
  }

  handleSubmitEdit = (value) => {
    this.setState({edit: false}, () => {
      this.props.editBlock(this.props.block.get('id'), {content: value})
    })
  }

  handleOnSwipe = (e) => {
    if (e.direction !== 2) { return }
    this.props.removeBlock(this.props.block.get('id'))
  }

  render() {
    const position = this.props.block.get('position')
      ? this.props.block.get('position').concat([0]).join(',')
      : 0
    return (
      <div
        ref={this.getRef}
        style={[
          style.default,
          {transform: `translate3d(${position})`},
          this.state.edit && {left: `${-this.state.position[0]}px`},
        ]}
      >
        <EnterText
          isActive={this.state.edit}
          value={this.state.entry.content}
          onSubmit={this.handleSubmitEdit}
        />

        <Hammer
          onTap={this.handleTapEdit}
          onSwipe={this.handleOnSwipe}
          direction={'DIRECTION_ALL'}
        >
          <h1
            ref={this.getRefText}
            style={[
              style.text,
              this.props.block.get('style'),
              this.props.isEditing && style.isEditing,
              this.state.edit && ({display: 'none'}),
            ]}
          >
            {this.state.entry.content}
          </h1>
        </Hammer>
      </div>
    )
  }
}

export default Radium(observer(BlockWords))
