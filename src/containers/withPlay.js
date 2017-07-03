import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import {Howl}               from 'howler'

import Autobot              from 'lib/Autobot'
import Commands             from 'lib/Commands'
import throttle             from 'lib/throttle'
import TimeKeeper           from 'lib/TimeKeeper'
import VideosDB             from 'lib/VideosDB'

const Videos = VideosDB()

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    constructor(props) {
      super(props)

      this.resetState = this.resetState.bind(this)
      this.initialState = this.initialState.bind(this)
      this.getTimeFromLink = this.getTimeFromLink.bind(this)
      this.isPlayable = this.isPlayable.bind(this)
      this.setVideoData = this.setVideoData.bind(this)
      this.loadVideo = this.loadVideo.bind(this)
      this.editorRef = this.editorRef.bind(this)
      this.resultRef = this.resultRef.bind(this)
      this.getEditor = this.getEditor.bind(this)
      this.resultData = this.resultData.bind(this)
      this.resultEndpoint = this.resultEndpoint.bind(this)
      this.result = this.result.bind(this)
      this.toggleLibrary = this.toggleLibrary.bind(this)
      this.getChunkPosition = this.getChunkPosition.bind(this)
      this.setChunkPosition = this.setChunkPosition.bind(this)
      this.setStart = this.setStart.bind(this)
      this.pause = this.pause.bind(this)
      this.replay = this.replay.bind(this)
      this.play = this.play.bind(this)
      this.seekTo = this.seekTo.bind(this)

      this.state = this.initialState()
    }

    componentWillMount() {
      function noop() {}
      this.sound = {pause: noop, play: noop, seek: noop, stop: noop}

      this.timeKeeper = TimeKeeper()

      this.resultThrottled = throttle(this.result, 100)
      if (this.state.videoId) {
        this.loadVideo(this.state.videoId)
      }
    }

    componentDidMount() {
      this.editor = this.getEditor()
      this.autobot = Autobot(this.editor)
    }

    initialState() {
      return ({
        commands: [],
        videoId: this.props.videoId,
        mode: "html",
        libraryIsOpen: false,
        timeLink: this.getTimeFromLink(),

        chunkPosition: -1,
        timePosition: 0,
      })
    }

    resetState() {
      this.setState(this.initialState())
    }

    getTimeFromLink() {
      return window.location.hash.slice(1)
    }

    isPlayable() {
      return this.state.commands && this.state.commands.length > 0
    }

    setVideoData(video) {
      this.setStart() // todo
      this.setState(
        Object.assign({
          commands: video.commands,
          videoId: video.token,
          mode: video.mode,
          libraryIsOpen: false,
        },
        Commands(video.commands)
      ))

      const milliseconds = parseInt(this.state.timeLink || 0, 10)*1000
      if (milliseconds > 0) {
        this.seekTo(milliseconds)
      } else {
        this.play()
      }
    }

    loadVideo(videoId) {
      this.setState({libraryIsOpen: false})
      if (this.sound) { this.sound.stop() }

      Videos
        .find(videoId)
        .then((video) => {
          console.log(video)
          window.history.replaceState({}, null, `/?id=${videoId}`)

          if (video.audio_url) {
            this.sound = new Howl({
              src: [video.audio_url],
              preload: true
            })
            this.sound.on("load", () => {
              this.setVideoData(video)
            })
            if (this.sound.state() === "loaded") {
              this.setVideoData(video)
            }
          } else {
            this.setVideoData(video)
          }
        })
    }

    editorRef(node) {
      this.editorNode = node
    }

    resultRef(node) {
      this.resultNode = node
    }

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
    }

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
    }

    resultEndpoint() {
      switch (this.state.mode) {
        case "javascript": {
          return `${this.props.resultDomain}/output.html`
        }
        case "html": {
          return `${this.props.resultDomain}/output_webpage.html`
        }
        case "sql": {
          return `${this.props.resultDomain}/output_sql.html`
        }
        default: {
          return undefined
        }
      }
    }

    result() {
      if (this.resultNode) {
        const data = JSON.stringify(this.resultData())
        this
          .resultNode
          .contentWindow
          .postMessage(data, this.resultEndpoint())
      }
    }

    toggleLibrary() {
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
    }

    getChunkPosition() {
      return this.state.chunkPosition
    }

    setChunkPosition(index) {
      this.setState({chunkPosition: index})
    }

    setStart() {
      this.timeKeeper.reset()
      this.resetState()
      this.editor.setValue("")
    }

    pause(time) {
      this.timeKeeper.pause(time)
      this.sound.pause()
    }

    replay() {
      this.setStart()
      this.play()
    }

    play() {
      if (this.timeKeeper.isPlaying()) { return }

      this.sound.play()
      this.timeKeeper.start((newPosition) => {
        this.setState({timePosition: newPosition})
        const {chunk, chunkPosition} = this.state.nextChunk(newPosition, this.getChunkPosition())

        if (chunk) {
          chunk.forEach((c) => { this.autobot.runCommand(c) })
          this.setChunkPosition(chunkPosition)
          if (newPosition >= this.state.timeDuration) {
            this.pause()
            return
          }
        }
      })

    }

    seekTo(time) {
      this.sound.seek(time/1000)
      this.timeKeeper.pause(time)
      this.setState({timePosition: time})

      this.editor.setValue("")
      const chunkPosition = (
        this.state.chunksUpTo(time, (chunk) => {
          chunk.forEach((c) => { this.autobot.runCommand(c) })
        })
      )

      this.setChunkPosition(chunkPosition)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          play={this.play}
          pause={this.pause}
          replay={this.replay}
          seekTo={this.seekTo}

          isPlaying={this.timeKeeper.isPlaying}

          editorRef={this.editorRef}
          resultEndpoint={this.resultEndpoint}
          resultRef={this.resultRef}
          isPlayable={this.isPlayable}

          toggleLibrary={this.toggleLibrary}
          loadVideo={this.loadVideo}
        />
      )
    }
  }

  withPlay.defaultProps = {
    resultDomain: "https://d2n3d8kv7zaiml.cloudfront.net"
  }

  withPlay.propTypes = {
    resultDomain: PropTypes.string,
  }

  return withPlay
}

export default withPlay
