import {observer} from 'mobx-react'
import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import EnterText from 'components/EnterText/EnterText'
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

  componentDidMount() {
    this.props.block.player.on('start', this.onStart)
    this.props.block.player.on('tick', this.onTick)
    this.props.block.player.on('replay', this.resetState)
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
  }

  onStart = () => {
    console.log('ON START', this.props.block.id)
    const entry = this.props.block.data || {}
    this.setState({
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
    this.props.block.player.replay()
  }

  initializeTimeline = () => {
    switch (this.state.entry.effect) {
      case 'fadeIn': {
        this.timeline = fadeIn(this.node)
        break
      }
      case 'typing': {
        this.timeline = typing(this.node)
        break
      }
      case 'enterLeft': {
        this.timeline = enterLeft(this.node)
        break
      }
      default: {
        this.timeline = fadeIn(this.node)
      }
    }
  }

  getRef = (node) => {
    this.node = node
  }

  resetState = () => {
    this.setState(BlockWords.initialState())
  }

  handleTapEdit = () => {
    this.setState({edit: !this.state.edit})
  }

  handleSubmitEdit = (value) => {
    this.setState({edit: false})
    this.props.editBlock(this.props.block.id, {content: value})
  }

  handleOnSwipe = (e) => {
    if (e.direction !== 2) { return }
    this.props.removeBlock(this.props.block.id)
  }

  render() {
    const position = this.props.block.position
      ? this.props.block.position.concat([0]).join(',')
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
      {this.state.edit && (
          <EnterText
            isActive={true}
            value={this.state.entry.content}
            onSubmit={this.handleSubmitEdit}
          />
        )}

        <Hammer
          onTap={this.handleTapEdit}
          onSwipe={this.handleOnSwipe}
          direction={'DIRECTION_ALL'}
        >
          <h1
            style={[
              style.text,
              this.props.block.style,
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
