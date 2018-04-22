import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import AudioPlayer          from 'lib/AudioPlayer'
import TimeKeeper           from 'lib/TimeKeeper'

import { findVideo }        from 'lib/actions'

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    static propTypes = {
      videoId: PropTypes.string.isRequired,
      video: PropTypes.object.isRequired,
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

      this.props.video.getBlocks().forEach((block) => {
        if (block.transitions.next) {
          if (block.auto !== false ) {
            block.player.on('end', () => {
              setTimeout(() => {
                console.log("finished!", block.id, block.transitions.next)
                this.setActiveSceneId(block.transitions.next)
              }, 1000) // hack for time offset
            })
          }
        } else {
          block.player.on('end', () => {
            console.log("finished!", block.id)
            this.pause()
          })
        }
      })
    }

    setActiveSceneId = (activeSceneId) => {
      this.setState({activeSceneId})
    }

    initialState = () => ({
      libraryIsOpen: false,
      loadState: undefined,
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
      const activeSceneId = this.props.video.getInitialSceneId()

      this.setState({
        videoId: video.token,
        libraryIsOpen: false,
        loadState: "loaded",
        timeDuration: this.props.video.timeDuration(),
        activeSceneId,
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
      // this.sound.play()

      this.timeKeeper.start((nextTimePosition) => {
        // if (nextTimePosition > this.state.timeDuration) {
        //   this.pause()
        // }

        this.props.video
          .blocksAtScene(this.state.activeSceneId)
          .forEach((d) => { d.player.play(nextTimePosition) })

        this.setState({
          timePosition: nextTimePosition,
        })
      })
    }

    seekTo = (timePosition) => {
      const block = this.props.video.blockAtTime(timePosition)

      this.sound.seek(timePosition/1000)
      this.timeKeeper.pause(timePosition)
      this.setState({
        timePosition: timePosition,
        activeSceneId: block.sceneId,
      })

      block.player.seekTo(block.offsetTimePosition)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}

          video={this.props.video}

          play={this.play}
          pause={this.pause}
          replay={this.replay}
          seekTo={this.seekTo}

          isPlayable={this.isPlayable}
          toggleLibrary={this.toggleLibrary}

          setActiveSceneId={this.setActiveSceneId}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
