import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  typing,
  fadeIn,
  enterLeft
} from './effects'

import style from './style'

class WordsBlock extends PureComponent {
  static propTypes = {
    block: PropTypes.object.isRequired,
  }

  static initialState() {
    return ({
      isActivated: false,
      entry: {},
      entryIndex: undefined,
    })
  }

  state = WordsBlock.initialState()

  componentDidMount() {
    this.props.block.player.on('start', this.onStart)
    this.props.block.player.on('tick', this.onTick)
  }

  onStart = () => {
    console.log('ON START', this.props.block.id)
    const entryIndex = 0 // TODO remove hard code
    const entry = this.props.block.payload[entryIndex] || {}
    this.setState({
      entry,
      entryIndex,
    }, this.initializeTimeline)
  }

  // TODO: better implementation
  onTick = () => {
    if (this.state.isActivated) { return }
    this.timeline && this.timeline.play()
    this.setState({isActivated: true})
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
    this.setState(WordsBlock.initialState())
  }

  render() {
    return (
      <div style={style.default}>
        <h1
          style={style.text}
          ref={this.getRef}
        >
          {this.state.entry.content}
        </h1>
      </div>
    )
  }
}

export default WordsBlock
