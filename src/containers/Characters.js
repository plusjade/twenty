import React, {PureComponent}   from 'react'
import PropTypes            from 'prop-types'
import Emoji                from 'components/Emoji'
import Layer                from 'components/Layer/Layer'
// import style                from './Style'

class Characters extends PureComponent {
  componentDidMount() {
    const container = new window.TimelineLite()
    const emoji = new window.TimelineLite()
    container
      .to(this.nodeContainer, 3, {xPercent: 120})
      .to(this.nodeContainer, 2, {xPercent: 50})
      .to(this.nodeContainer, 2, {yPercent: -10, ease: window.Bounce.easeIn})
      .to(this.nodeContainer, 1, {yPercent: 0, ease: window.Bounce.easeOut})
    emoji
      .to(this.nodeEmoji, 0.5, {opacity: 1})
      .to(this.nodeEmoji, 2, {rotation: "720_cw"}, "-=0.5")
      .to(this.nodeEmoji, 2, {rotation: "360_ccw"})
      .to(this.nodeEmoji, 1, {rotation: "270_ccw"})
      .to(this.nodeEmoji, 1, {rotation: "0_cw"})

    this.timeline = new window.TimelineLite()
    this.timeline.add([container, emoji])
    console.log(this.timeline.duration())
    this.timeline.pause()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying) {
      this.timeline.play()
    } else {
      this.timeline.pause()
    }
    // this.timeline.progress(nextProps.timePosition / nextProps.timeDuration * 2)
  }

  getRefEmoji = (node) => {
    this.nodeEmoji = node
  }

  getRefContainer = (node) => {
    this.nodeContainer = node
  }

  render() {
    console.log("render")
    return (
      <Layer style={{pointerEvents: "none"}}>
        <Emoji
          refEmojiCallback={this.getRefEmoji}
          refContainerCallback={this.getRefContainer}
        />
      </Layer>
    )
  }
}

export default Characters
