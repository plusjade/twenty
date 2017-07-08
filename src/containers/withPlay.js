import React, {Component}   from 'react'

import AudioPlayer          from 'lib/AudioPlayer'
import throttle             from 'lib/throttle'
import ResultRenderer       from 'lib/ResultRenderer'
import TextPlayer           from 'lib/TextPlayer'
import TimeKeeper           from 'lib/TimeKeeper'

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    constructor(props) {
      super(props)

      this.initialState = this.initialState.bind(this)
      this.resetState = this.resetState.bind(this)
      this.state = this.initialState()

      this.isPlayable = this.isPlayable.bind(this)
      this.toggleLibrary = this.toggleLibrary.bind(this)

      this.setVideoData = this.setVideoData.bind(this)
      this.loadVideo = this.loadVideo.bind(this)
      this.getTimeFromLink = this.getTimeFromLink.bind(this)

      this.editorRef = this.editorRef.bind(this)
      this.getEditor = this.getEditor.bind(this)

      this.resultRendererRef = this.resultRendererRef.bind(this)

      this.pause = this.pause.bind(this)
      this.play = this.play.bind(this)
      this.replay = this.replay.bind(this)
      this.seekTo = this.seekTo.bind(this)
      this.setStart = this.setStart.bind(this)
    }

    componentWillMount() {
      this.textPlayer = TextPlayer()
      this.textPlayer.on("end", this.pause)

      this.sound = AudioPlayer()
      this.timeKeeper = TimeKeeper()

      if (this.state.videoId) {
        this.loadVideo(this.state.videoId)
      }

      this.resultRenderer = ResultRenderer(this.state.mode)

      this.resultUpdateThrottled = throttle(
        () => this.resultRenderer.update(this.editor.getValue())
      )
    }

    componentDidMount() {
      this.editor = this.getEditor()
      this.textPlayer.mount(this.editor)

      if (this.resultRendererNode && this.editor) {
        this.resultRenderer.mount(this.resultRendererNode)
        this.editor.session.doc.on("change", this.resultUpdateThrottled, true)
      }
    }

    initialState() {
      return ({
        videoId: this.props.videoId,
        mode: "html",
        libraryIsOpen: false,
        timeLink: this.getTimeFromLink(),

        timePosition: 0,
        timeDuration: 0,
      })
    }

    resetState() {
      this.setState(this.initialState())
    }

    getTimeFromLink() {
      return window.location.hash.slice(1)
    }

    isPlayable() {
      return this.state.timeDuration > 0
    }

    setVideoData(video) {
      this.setStart() // todo
      this.textPlayer.reset(video.commands)
      this.setState({
        videoId: video.token,
        mode: video.mode,
        libraryIsOpen: false,
        loadState: "loaded",
        timeDuration: this.textPlayer.timeDuration()
      })

      const milliseconds = parseInt(this.state.timeLink || 0, 10)*1000
      if (milliseconds > 0) {
        this.seekTo(milliseconds)
      }
    }

    loadVideo(videoId) {
      this.setState({loadState: "loading", libraryIsOpen: false})
      this.sound.stop()

      this.props.videosDB
        .find(videoId)
        .then((video) => {
          if (video) {
            console.log(video)
            window.history.replaceState({}, null, `/?id=${videoId}`)
            this.sound.mount(video.audio_url, () => {
              this.setVideoData(video)
            })
          } else {
            this.setState({loadState: "notFound"})
          }
        })
    }

    editorRef(node) {
      this.editorNode = node
    }

    resultRendererRef(node) {
      this.resultRendererNode = node
    }

    getEditor() {
      if (this.editor) { return this.editor }
      if (!this.editorNode) { return }
      this.editor = window.editor = window.ace.edit(this.editorNode)
      this.editor.$blockScrolling = Infinity
      this.editor.setTheme("ace/theme/twilight")
      this.editor.getSession().setMode(`ace/mode/${this.state.mode}`)
      this.editor.getSession().setUseSoftTabs(true)

      return this.editor
    }

    toggleLibrary() {
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
    }

    setStart() {
      this.timeKeeper.reset()
      this.resetState()
      this.editor.setValue("")
      this.resultRenderer.update("")
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
      this.timeKeeper.start((nextTimePosition) => {
        this.setState({timePosition: nextTimePosition})
        this.textPlayer.play(nextTimePosition)
      })
    }

    seekTo(timePosition) {
      this.sound.seek(timePosition/1000)
      this.timeKeeper.pause(timePosition)
      this.setState({timePosition: timePosition})

      this.editor.setValue("")
      this.textPlayer.seekTo(timePosition)
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

          resultEndpoint={this.resultRenderer.endpoint}
          resultRendererRef={this.resultRendererRef}

          isPlayable={this.isPlayable}

          toggleLibrary={this.toggleLibrary}
          loadVideo={this.loadVideo}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
