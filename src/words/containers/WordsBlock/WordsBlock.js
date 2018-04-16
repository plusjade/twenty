import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  typing,
  fadeIn,
  enterLeft
} from './effects'

import style from './style'

const runCommand = (command) => {
  // eslint-disable-next-line
  const [time, entryIndex, progress] = command
  return ({entryIndex, progress})
}

const runCommands = (commands) => {
  // eslint-disable-next-line
  const [time, entryIndex, progress] = commands.slice(-1)[0]
  return ({entryIndex, progress})
}

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying) {
      this.timeline && this.timeline.play()
    } else {
      this.timeline && this.timeline.pause()
    }
  }

  componentDidMount() {
    this.props.block.player.on('start', this.onStart)
    this.props.block.player.on('runCommand', this.runCommand)
    // for seekTo support
    this.props.block.player.on('runCommands', this.runCommands)
  }

  onStart = () => {
    if (!this.state.isActivated) {
      this.setState({isActivated: true})
    }
  }

  runCommand = (command) => {
    const {entryIndex, progress} = runCommand(command)
    this.onTick({entryIndex, progress})
  }

  runCommands = (commands) => {
    const {entryIndex, progress} = runCommands(commands)
    this.onTick({entryIndex, progress})
  }

  // wordsThing comes as an array of one or more sentences.
  // entryIndex is the array index that produces the entire sentence
  onTick = ({entryIndex, progress}) => {
    if (this.state.entryIndex === entryIndex) {
      // this.timeline.progress(progress)
    } else {
      // first instance of this entry
      // entry is the entire sentence payload...
      const entry = this.props.block.initialPayload[entryIndex] || {}
      this.setState({
        entry,
        entryIndex,
      }, this.initializeTimeline)
    }
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
          {this.state.entry.data}
        </h1>
      </div>
    )
  }
}

export default WordsBlock
