import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import AudioPlayer          from 'lib/AudioPlayer'

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

      if (this.state.videoId) {
        this.loadVideo(this.state.videoId)
      }

      this.props.video.getBlocks().forEach((block) => {
        if (block.transitions.next) {
          block.player.on('start', () => {
            console.log(block.id, "^_^ start!", block.transitions.next)
            this.setState({nextSceneId: block.transitions.next})
          })

          block.player.on('end', () => {
            console.log(block.id, "finished!", block.transitions.next)
          })
        } else if (block.transitions.prev) {
          block.player.on('end', () => {
            console.log("complete!", block.id)
          })
        }
      })
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
      this.resetState()
    }

    nextScene = (sceneId) => {
      const activeSceneId = sceneId || this.state.nextSceneId
      console.log('nextScene', activeSceneId)
      this.setState({activeSceneId}, this.play)
    }

    pause = (time) => {
      this.setState({isPlaying: false})
      this.props.video
        .blocksAtScene(this.state.activeSceneId)
        .forEach((block) => { block.player.pause() })
    }

    replay = () => {
      this.setStart()
      this.play()
    }

    play = () => {
      this.setState({isPlaying: true})
      // this.sound.play()
      this.props.video
        .blocksAtScene(this.state.activeSceneId)
        .forEach((block) => {
          block.player.play()
        })
    }

    seekTo = (timePosition) => {
      const block = this.props.video.blockAtTime(timePosition)

      this.sound.seek(timePosition/1000)
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

          nextScene={this.nextScene}
          nextSceneId={this.state.nextSceneId}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
