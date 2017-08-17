import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import AudioPlayer          from 'lib/AudioPlayer'
import Scenes               from 'lib/Scenes'
import TimeKeeper           from 'lib/TimeKeeper'

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    static propTypes = {
      videoId: PropTypes.string.isRequired,
      scenes: PropTypes.array.isRequired,
      substitutions: PropTypes.object.isRequired,
      videosDB: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props)
      this.state = this.initialState()
    }

    componentWillMount() {
      this.sound = AudioPlayer()
      this.timeKeeper = TimeKeeper()

      if (this.state.videoId) {
        this.loadVideo(this.state.videoId)
      }
    }

    initialState = () => ({
      libraryIsOpen: false,
      loadState: undefined,
      scene: {},
      timeDuration: 0,
      timePosition: 0,
      videoId: this.props.videoId,
      isPlaying: false,
    })

    resetState = () => {
      this.setState(this.initialState())
    }

    mountBot = (type, bot, index) => {
      this.scenes.mount(type, bot, index)
    }

    isPlayable = () => (
      this.state.timeDuration > 0
    )

    setVideoData = (video) => {
      this.setStart() // todo
      const scenes = this.props.scenes.slice(0)
      const lastScene = scenes.pop()
      scenes.push({
        type: "editor",
        data: video.commands,
      })
      scenes.push(lastScene)
      this.scenes = Scenes(scenes, this.props.substitutions)
      const scene = this.scenes.at(1)

      this.setState({
        videoId: video.token,
        libraryIsOpen: false,
        loadState: "loaded",
        timeDuration: this.scenes.timeDuration(),
        scene: Object.assign({}, scene, {player: undefined}),
      })
    }

    loadVideo = (videoId) => {
      this.setState({loadState: "loading", libraryIsOpen: false})
      this.sound.stop()

      this.props.videosDB
        .find(videoId)
        .then((video) => {
          if (video) {
            console.log(video)
            if (!window.location.search.includes("id")) {
              window.history.replaceState({}, null, `/?id=${videoId}`)
            }
            this.sound.mount(video.audio_url, () => {
              this.setVideoData(video)
            })
          } else {
            this.setState({loadState: "notFound"})
          }
        })
    }

    toggleLibrary = () => {
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
    }

    setStart = () => {
      this.timeKeeper.reset()
      this.resetState()
    }

    pause = (time) => {
      this.setState({isPlaying: false})
      this.timeKeeper.pause(time)
      this.sound.pause()
    }

    replay = () => {
      this.setStart()
      this.play()
    }

    play = () => {
      if (this.state.isPlaying) { return }
      this.setState({isPlaying: true})
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

    seekTo = (timePosition) => {
      const scene = this.scenes.at(timePosition)

      this.sound.seek(timePosition/1000)
      this.timeKeeper.pause(timePosition)
      this.setState({
        timePosition: timePosition,
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

          isPlayable={this.isPlayable}
          mountBot={this.mountBot}
          toggleLibrary={this.toggleLibrary}
          loadVideo={this.loadVideo}
          sceneTypes={this.scenes ? this.scenes.types() : []}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
