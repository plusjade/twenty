import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import SplitText            from 'vendor/SplitText'

import WordsBot             from 'words/lib/WordsBot'
import style                from './Style'

class WordsThing extends Component {
  static propTypes = {
    thing: PropTypes.object.isRequired,
  }

  static initialState() {
    return ({
      content: "",
      entryIndex: undefined,
      initialPayload: [],
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
    this.props.thing.player.addUpdateCallback(
      this.onTick
    )
    this.props.thing.player.addEmitPayloadCallback(
      this.initialPayloadDidUpdate
    )
  }

  // wordsThing comes as an array of one or more sentences.
  // entryIndex is the array index that produces the entire sentence
  onTick = (entryIndex, progress) => {
    if (this.state.entryIndex === entryIndex) {
      // this.timeline.progress(progress)
    } else {
      // first instance of this entry
      const node = this.state.initialPayload[entryIndex]
      const content = node && node.data
      // content is the entire sentence.. how does the typing effect work?
      // console.log(content, entryIndex, this.state.entryIndex)
      this.setState(
        {content: content, entryIndex: entryIndex},
        this.initializeTimeline
      )
    }
  }

  // this is a way to refresh the wordsScene when transitioning
  // to a new that happens to be the same words type.
  // noop if we're on the same scene index
  initialPayloadDidUpdate = ({sceneIndex, initialPayload}) => {
    if (sceneIndex === this.state.sceneIndex) { return }
    console.log("switch scene", sceneIndex, initialPayload)
    this.setState({
      sceneIndex,
      initialPayload,
    })
  }

  initializeTimeline = () => {
    console.log('initializeTimeline')
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
