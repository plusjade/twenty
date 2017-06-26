import React, {PropTypes}   from 'react'
import Autobot              from './lib/Autobot'

const Play = (Component) => {
  const Play = React.createClass({
    propTypes: {
      chunksUpTo: PropTypes.func.isRequired,
      nextChunk: PropTypes.func.isRequired,
      timeDuration: PropTypes.number.isRequired,
      videoId: PropTypes.string,
    },

    initialState() {
      return ({
        chunkPosition: -1,
        timeStart: undefined,
        timePosition: 0,
        timePositionPaused: 0,
      })
    },

    getInitialState() {
      return (this.initialState())
    },

    componentWillMount() {
      this.playInterval = undefined
    },

    componentDidMount() {
      this.editor = this.props.getEditor()
      this.autobot = Autobot(this.editor)
      this.play()
    },

    componentWillReceiveProps(nextProps) {
      if (nextProps.videoId !== this.props.videoId) {
        this.replay()
      }
    },

    resetState() {
      this.setState(this.initialState())
    },

    isPaused() {
      return !this.playInterval
    },

    getChunkPosition() {
      return this.state.chunkPosition
    },

    setChunkPosition(index) {
      this.setState({chunkPosition: index})
    },

    getTimeNow() {
      return (new Date()).getTime()
    },

    setTimeStart() {
      this.setState({timeStart: this.getTimeNow()})
    },

    getTimeStart() {
      return this.state.timeStart
    },

    getTimePosition() {
      return this.state.timePositionPaused + this.getTimeNow() - this.getTimeStart()
    },

    updateTimePosition(time) {
      this.setState({timePosition: time || this.getTimePosition()})
    },

    setStart() {
      this.clearTicker()
      this.resetState()
      this.editor.setValue("")
    },

    clearTicker() {
      clearInterval(this.playInterval)
      this.playInterval = undefined
    },

    pause(time) {
      this.clearTicker()
      this.setState({timePositionPaused: time || this.state.timePosition})
    },

    replay() {
      this.setStart()
      this.play()
    },

    play() {
      if (this.playInterval) { return }
      this.setTimeStart()
      this.playInterval = setInterval(() => {
        this.updateTimePosition()
        const time = this.getTimePosition()
        const {chunk, chunkPosition} = this.props.nextChunk(time, this.getChunkPosition())

        if (chunk) {
          chunk.forEach((c) => { this.autobot.runCommand(c) })
          this.setChunkPosition(chunkPosition)
          if (time >= this.props.timeDuration) {
            this.pause()
            return
          }
        }
      }, 50)
    },

    seekTo(time) {
      this.pause(time)
      this.updateTimePosition(time)
      this.editor.setValue("")

      const chunkPosition = (
        this.props.chunksUpTo(time, (chunk) => {
          chunk.forEach((c) => { this.autobot.runCommand(c) })
        })
      )

      this.setChunkPosition(chunkPosition)
    },

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          play={this.play}
          pause={this.pause}
          replay={this.replay}
          seekTo={this.seekTo}
          isPaused={this.isPaused()}
        />
      )
    }
  })

  return Play
}

export default Play
