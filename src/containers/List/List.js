import React, {PureComponent}   from 'react'
import PropTypes            from 'prop-types'
import Emoji                from 'components/Emoji'
import Layer                from 'components/Layer/Layer'
import style                from './Style'

class List extends PureComponent {
  static defaultProps = {
    list: [
      {
        value: "Open a web browser",
        src: "/instacart.jpg",
      },
      {
        value: "Navigate to your favorite website",
        src: "/instacart.jpg",
      },
      {
        value: "https://www.instacart.com/",
        src: "/instacart.jpg",
      },
      {
        value: "Right click the page",
        src: "/view_source.jpg",
      },
      {
        value: "Click \"View Source\"",
        src: "/view_source.jpg",
      },
      {
        value: "What do you see?",
        src: "https://s3.amazonaws.com/media-p.slid.es/uploads/46703/images/3558698/Screen_Shot_2017-03-05_at_7.06.44_PM.png",
      },
    ]
  }

  state = {

  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({active: true})
    }, 1000)

    return
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

  __componentWillReceiveProps(nextProps) {
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

  handleClick = (entry) => {
    if (entry.src) {
      this.setState({src: entry.src})
    }
  }

  render() {
    return (
      <Layer style={{}}>
        <div
          style={[
            style.wrap
          ]}
        >
          <div
            style={[
              style.list.default
            ]}
          >
            <ol style={style.ul}>
              {this.props.list.map((entry) => (
                <li
                  style={style.li}
                  onClick={() => { this.handleClick(entry) }}
                >{entry.value}</li>
              ))}
            </ol>
          </div>
          <div
            style={[
              style.content.default,
              this.state.active && style.content.active
            ]}
          >

            <div
              style={[
                style.image,
                {
                  backgroundImage: `url(${this.state.src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }
              ]}
            />


          </div>

        </div>
      </Layer>
    )
  }
}

export default List
