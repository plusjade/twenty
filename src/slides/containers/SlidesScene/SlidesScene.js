import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import SplitText            from 'vendor/SplitText'

import PlayerOverlay        from 'components/PlayerOverlay/PlayerOverlay'
import SlidesBot            from 'slides/lib/SlidesBot'
import style                from './Style'

class SlidesScene extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    mountBot: PropTypes.func.isRequired,
    sceneIndex: PropTypes.number.isRequired,
  }

  static initialState() {
    return ({
      content: "",
      slideIndex: undefined,
    })
  }

  state = SlidesScene.initialState()

  componentDidMount() {
    this.props.mountBot("slides", (
      SlidesBot(this.onTick, this.initialPayloadDidUpdate))
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying) {
      this.timeline && this.timeline.play()
    } else {
      this.timeline.pause()
    }

    if (nextProps.sceneIndex !== this.props.sceneIndex) {
      this.setState({content: ""})
    }
  }

  onTick = (slideIndex, progress) => {
    if (this.state.slideIndex === slideIndex) {
      // this.timeline.progress(progress)
    } else {
      // first instance of this slide
      const content = this.state.initialPayload[slideIndex].data
      this.setState(
        {content: content, slideIndex: slideIndex},
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
    this.setState(SlidesScene.initialState())
  }

  render() {
    if (!this.props.isActive) { return null }

    return (
      <PlayerOverlay>
        <div style={style.default}>
          <h1
            style={style.text}
            ref={this.getRef}
          >
            {this.state.content}
          </h1>
        </div>
      </PlayerOverlay>
    )
  }
}

export default SlidesScene
