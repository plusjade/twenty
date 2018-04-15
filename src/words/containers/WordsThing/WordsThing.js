import React, { PureComponent }   from 'react'
import PropTypes            from 'prop-types'
import SplitText            from 'vendor/SplitText'

import style from './Style'

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

class WordsThing extends PureComponent {
  static propTypes = {
    thing: PropTypes.object.isRequired,
  }

  static initialState() {
    return ({
      isActivated: false,
      content: "",
      entryIndex: undefined,
    })
  }

  state = WordsThing.initialState()

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying) {
      this.timeline && this.timeline.play()
    } else {
      this.timeline && this.timeline.pause()
    }
  }

  componentDidMount() {
    this.props.thing.player.on('start', this.onStart)
    this.props.thing.player.on('runCommand', this.runCommand)
    // for seekTo support
    this.props.thing.player.on('runCommands', this.runCommands)
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
      // content is the entire sentence..
      const entry = this.props.thing.initialPayload[entryIndex]
      const content = entry && entry.data
      this.setState({content, entryIndex}, this.initializeTimeline)
    }
  }

  initializeTimeline = () => {
    const mySplitText = new SplitText(this.node, {type:"chars,words"})
    this.timeline = new window.TimelineLite()
    // This works on timing. 0.2 is the duration of the effect
    // so we're basically just coordinating the duraction of the effect to
    // how long we've given the scene to last. fixme?
    // console.log(mySplitText.chars)
    this.timeline.staggerFrom(mySplitText.chars, 0.2, {opacity: 0}, 0.055)
    this.timeline.pause()
  }

  getRef = (node) => {
    this.node = node
  }

  resetState = () => {
    this.setState(WordsThing.initialState())
  }

  render() {
    return (
      <div style={style.default}>
        <h1
          style={style.text}
          ref={this.getRef}
        >
          {this.state.content}
        </h1>
      </div>
    )
  }
}

export default WordsThing
