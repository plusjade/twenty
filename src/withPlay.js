import React, {PropTypes}   from 'react'
import Autobot              from './lib/Autobot'
import Commands             from './lib/Commands'
import throttle             from './lib/throttle'

import VideosDB             from './lib/VideosDB'
import QueryParams          from './lib/QueryParams'

const Videos = VideosDB()
const QParams = QueryParams()

const withPlay = (Component) => {
  const withPlay = React.createClass({
    getDefaultProps() {
      return ({
        resultDomain: "http://twenty-result.s3-website-us-west-2.amazonaws.com"
      })
    },

    initialState() {
      return ({
        commands: [],
        videoId: QParams.get("id"),
        videos: [],
        mode: "html",
        libraryIsOpen: false,
        timeLink: this.getTimeFromLink(),

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

      this.resultThrottled = throttle(this.result, 100)
      if (this.state.videoId) {
        this.loadVideo(this.state.videoId)
      }
    },

    componentDidMount() {
      this.editor = this.getEditor()
      this.autobot = Autobot(this.editor)
    },

    resetState() {
      this.setState(this.initialState())
    },

    getTimeFromLink() {
      return window.location.hash.slice(1)
    },

    isPlayable() {
      return this.state.commands && this.state.commands.length > 0
    },

    loadCommands(commands) {
      this.setStart() // todo
      const state = Object.assign({commands: commands}, Commands(commands))
      this.setState(state)

      const milliseconds = parseInt(this.state.timeLink || 0)*1000
      if (milliseconds > 0) {
        this.seekTo(milliseconds)
      } else {
        this.play()
      }
    },

    loadVideo(videoId) {
      Videos
        .find(videoId)
        .then((video) => {
          console.log(video)
          window.history.replaceState({}, null, `/?id=${videoId}`)
          this.loadCommands(video.commands)
          this.setState({
            videoId: videoId,
            mode: video.mode,
            libraryIsOpen: false,
          })
        })
    },

    refreshVideos() {
      Videos.list().then((rsp) => {
        this.setState({videos: rsp.data})
      })
    },

    editorRef(node) {
      this.editorNode = node
    },

    resultRef(node) {
      this.resultNode = node
    },

    getEditor() {
      if (this.editor) { return this.editor }
      if (!this.editorNode) { return }
      this.editor = window.editor = window.ace.edit(this.editorNode)
      this.editor.setTheme("ace/theme/twilight")
      this.editor.getSession().setMode(`ace/mode/${this.state.mode}`)
      this.editor.getSession().setUseSoftTabs(true)
      this.editor.session.doc.on("change", this.resultThrottled, true)
      this.editor.$blockScrolling = Infinity
      return this.editor
    },

    resultData() {
      const code = this.getEditor().getValue()
      return ({
        "code": code,
        "cursor": {
          "start": 0,
          "end": 0
        },
        "validate": "",
        "noLint": false,
        "version": 4,
        "settings": {},
        "workersDir": `${this.props.resultDomain}/workers/`,
        "externalsDir": `${this.props.resultDomain}/external/`,
        "imagesDir": `${this.props.resultDomain}/images/`,
        "soundsDir": `${this.props.resultDomain}/sounds/`,
        "jshintFile": `${this.props.resultDomain}/external/jshint/jshint.js`,
        "outputType": "",
        "enableLoopProtect": true
      })
    },

    resultEndpoint() {
      switch (this.state.mode) {
        case "javascript": {
          return `${this.props.resultDomain}/output.html`
          break
        }
        case "html": {
          return `${this.props.resultDomain}/output_webpage.html`
          break
        }
        case "sql": {
          return `${this.props.resultDomain}/output_sql.html`
          break
        }
      }
    },

    result() {
      if (this.resultNode) {
        const data = JSON.stringify(this.resultData())
        this
          .resultNode
          .contentWindow
          .postMessage(data, this.resultEndpoint())
      }
    },

    toggleLibrary() {
      this.refreshVideos()
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
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
        const {chunk, chunkPosition} = this.state.nextChunk(time, this.getChunkPosition())

        if (chunk) {
          chunk.forEach((c) => { this.autobot.runCommand(c) })
          this.setChunkPosition(chunkPosition)
          if (time >= this.state.timeDuration) {
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
        this.state.chunksUpTo(time, (chunk) => {
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

          editorRef={this.editorRef}
          resultEndpoint={this.resultEndpoint}
          resultRef={this.resultRef}
          isPlayable={this.isPlayable}

          toggleLibrary={this.toggleLibrary}
          loadVideo={this.loadVideo}
        />
      )
    }
  })

  return withPlay
}

export default withPlay
