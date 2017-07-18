import React, {Component}   from 'react'

import AudioPlayer          from 'lib/AudioPlayer'
import EditorBot            from 'textEditor/lib/EditorBot'
import Scenes               from 'lib/Scenes'
import ResultRenderer       from 'textEditor/lib/ResultRenderer'
import throttle             from 'lib/throttle'
import TimeKeeper           from 'lib/TimeKeeper'
import SlidesBot            from 'slides/lib/SlidesBot'
import TextingBot           from 'texting/lib/TextingBot'

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

      if (this.resultRendererNode && this.editor) {
        this.resultRenderer.mount(this.resultRendererNode)
        this.editor.session.doc.on("change", this.resultUpdateThrottled, true)
      }
    }

    initialState() {
      return ({
        libraryIsOpen: false,
        scene: {},
        timeDuration: 0,
        timePosition: 0,
        videoId: this.props.videoId,

        mode: "html",
        slide: {},
        messages: [],
      })
    }

    resetState() {
      this.setState(this.initialState())
    }

    isPlayable() {
      return this.state.timeDuration > 0
    }

    setVideoData(video) {
      this.setStart() // todo

      const set = [
        {
          type: "texting",
          data: this.props.texting,
        },
        {
          type: "slides",
          data: this.props.slides,
        },
        {
          type: "editor",
          data: video.commands,
        },
        {
          type: "slides",
          data: this.props.slides2,
        },
      ]
      this.scenes = Scenes({
        set: set,
        editorBot: () => (EditorBot(this.editor)),
        slidesBot: () => (
          SlidesBot((text, index) => {
            this.setState({slide: {type: "title", data: text, index: index}})
          })
        ),
        textingBot: () => (
          TextingBot((messages, typingStatus) => {
            this.setState({messages: messages, typingStatus: typingStatus})
          })
        ),
      })
      const scene = this.scenes.at(1)

      this.setState({
        videoId: video.token,
        mode: video.mode,
        libraryIsOpen: false,
        loadState: "loaded",
        timeDuration: this.scenes.timeDuration(),
        scene: Object.assign({}, scene, {player: undefined}),
      })
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
        let scene
        if (nextTimePosition > this.state.timeDuration) {
          this.pause()
        }

        scene = this.scenes.at(nextTimePosition)
        this.setState({
          timePosition: nextTimePosition,
          scene: Object.assign({}, scene, {player: undefined})
        })
        scene.player.play(scene.offsetTimePosition)
      })
    }

    seekTo(timePosition) {
      const scene = this.scenes.at(timePosition)

      this.sound.seek(timePosition/1000)
      this.timeKeeper.pause(timePosition)
      this.setState({timePosition: timePosition})

      this.editor.setValue("")
      this.setState({
        //slide: {type: "title", data: ""},
        scene: Object.assign({}, scene, {player: undefined}),
      })

      scene.player.seekTo(scene.offsetTimePosition)
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
