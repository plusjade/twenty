import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import AudioPlayer          from 'lib/AudioPlayer'
import TimeKeeper           from 'lib/TimeKeeper'

import { findVideo }        from 'lib/actions'

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    static propTypes = {
      videoId: PropTypes.string.isRequired,
      scenes: PropTypes.object.isRequired,
      substitutions: PropTypes.object.isRequired,
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
      thing: {},
      timeDuration: 0,
      timePosition: 0,
      videoId: this.props.videoId,
      isPlaying: false,
      activeSceneId: null,
    })

    resetState = () => {
      this.setState(this.initialState())
    }

    isPlayable = () => (
      this.state.timeDuration > 0
    )

    loadVideo = (videoId) => {
      this.setState({loadState: "loading", libraryIsOpen: false})
      this.sound.stop()
      findVideo(videoId)
        .then((video) => {
          if (video) {
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

    setVideoData = (video) => {
      this.setStart() // todo
      // const lastScene = scenes.pop()
      // scenes.push({
      //   type: "editor",
      //   data: video.commands,
      // })
      // scenes.push(lastScene)
      const thing = this.props.scenes.at(1)
      this.setState({
        videoId: video.token,
        libraryIsOpen: false,
        loadState: "loaded",
        timeDuration: this.props.scenes.timeDuration(),
        thing,
        activeSceneId: thing.parentSceneId,
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
        let thing
        if (nextTimePosition > this.state.timeDuration) {
          this.pause()
        }

        thing = this.props.scenes.at(nextTimePosition)
        // TODO: make sure to verify offsetTimePosition
        this.setState({
          timePosition: nextTimePosition,
          thing,
          activeSceneId: thing.parentSceneId,
        }, () => {
          thing.player.play(thing.offsetTimePosition)
        })
      })
    }

    seekTo = (timePosition) => {
      const thing = this.props.scenes.at(timePosition)

      this.sound.seek(timePosition/1000)
      this.timeKeeper.pause(timePosition)
      this.setState({
        timePosition: timePosition,
        thing,
        activeSceneId: thing.parentSceneId,
      })

      thing.player.seekTo(thing.offsetTimePosition)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}

          scenes={this.props.scenes}

          play={this.play}
          pause={this.pause}
          replay={this.replay}
          seekTo={this.seekTo}

          isPlayable={this.isPlayable}
          toggleLibrary={this.toggleLibrary}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
