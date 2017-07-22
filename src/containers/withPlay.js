import React, {Component}   from 'react'

import AudioPlayer          from 'lib/AudioPlayer'
import Scenes               from 'lib/Scenes'
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

      this.mountBot = this.mountBot.bind(this)

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
    }

    initialState() {
      return ({
        libraryIsOpen: false,
        scene: {},
        timeDuration: 0,
        timePosition: 0,
        videoId: this.props.videoId,

        slide: {},
        messages: [],
      })
    }

    resetState() {
      this.setState(this.initialState())
    }

    mountBot(type, bot) {
      this.scenes.mount(type, bot)
    }

    isPlayable() {
      return this.state.timeDuration > 0
    }

    setVideoData(video) {
      this.setStart() // todo
      const scenes = this.props.scenes.slice(0)
      scenes.push({
        type: "editor",
        data: video.commands,
      })
      this.scenes = Scenes(scenes)
      this.scenes.mount("slides", (
        SlidesBot((text, index) => {
          this.setState({slide: {type: "title", data: text, index: index}})
        })
      ))
      this.scenes.mount("texting", (
        TextingBot((messages, typingStatus) => {
          this.setState({messages: messages, typingStatus: typingStatus})
        })
      ))

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

    toggleLibrary() {
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
    }

    setStart() {
      this.timeKeeper.reset()
      this.resetState()
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

          isPlayable={this.isPlayable}
          mountBot={this.mountBot}
          toggleLibrary={this.toggleLibrary}
          loadVideo={this.loadVideo}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
