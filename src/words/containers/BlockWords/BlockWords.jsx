import {observer} from 'mobx-react'
import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
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
    })
  }

  state = BlockWords.initialState()

  componentDidMount() {
    this.props.block.player.on('start', this.onStart)
    this.props.block.player.on('tick', this.onTick)
    this.props.block.player.on('replay', this.resetState)
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
    if (!this.props.isEditing) { return }
    this.props.stageBlock(this.props.block.id, this.state.entry.content)
  }

  render() {
    return (
      <div style={style.default}>
        <Hammer onTap={this.handleTapEdit}>
          <h1
            style={[
              style.text,
              this.props.block.style,
              this.props.isEditing && style.isEditing
            ]}
            ref={this.getRef}
          >
            {this.state.entry.content}
          </h1>
        </Hammer>
      </div>
    )
  }
}

export default Radium(observer(BlockWords))
