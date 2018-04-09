import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import SplitText            from 'vendor/SplitText'

import Layer                from 'components/Layer/Layer'
import WordsBot             from 'words/lib/WordsBot'
import style                from './Style'

class WordsScene extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    mountBot: PropTypes.func.isRequired,
    sceneIndex: PropTypes.number.isRequired,
  }

  static initialState() {
    return ({
      content: "",
      entryIndex: undefined,
    })
  }

  state = WordsScene.initialState()

  componentDidMount() {
    this.props.mountBot("words", (
      WordsBot(this.onTick, this.initialPayloadDidUpdate))
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying) {
      this.timeline && this.timeline.play()
    } else {
      this.timeline.pause()
    }

    if (nextProps.sceneIndex !== this.props.sceneIndex) {
      this.setState(WordsScene.initialState())
    }
  }

  onTick = (entryIndex, progress) => {
    if (this.state.entryIndex === entryIndex) {
      // this.timeline.progress(progress)
    } else {
      // first instance of this entry
      const content = this.state.initialPayload[entryIndex].data
      this.setState(
        {content: content, entryIndex: entryIndex},
        this.initializeTimeline
      )
    }
  }

  initializeTimeline = () => {
    const mySplitText = new SplitText(this.node, {type:"chars,words"})
    this.timeline = new window.TimelineLite()
    this.timeline.staggerFrom(mySplitText.chars, 0.2, {opacity:0}, 0.055)
    this.timeline.pause()
  }

  initialPayloadDidUpdate = ({sceneIndex, initialPayload}) => {
    if (sceneIndex === this.state.sceneIndex) { return }
    this.setState({sceneIndex: sceneIndex, initialPayload: initialPayload})
  }

  getRef = (node) => {
    this.node = node
  }

  resetState = () => {
    this.setState(WordsScene.initialState())
  }

  render() {
    if (!this.props.isActive) { return null }

    return (
      <Layer>
        <div style={style.default}>
          <h1
            style={style.text}
            ref={this.getRef}
          >
            {this.state.content}
          </h1>
        </div>
      </Layer>
    )
  }
}

export default WordsScene
