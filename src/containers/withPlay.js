import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import AudioPlayer          from 'lib/AudioPlayer'
import TimeKeeper           from 'lib/TimeKeeper'

import { findVideo }        from 'lib/actions'

// http://underscorejs.org/docs/underscore.html
const debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = Date.now()
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    static propTypes = {
      videoId: PropTypes.string.isRequired,
      things: PropTypes.object.isRequired,
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


      this.props.things.getThings().forEach((thing) => {
        if (thing.nextSceneId) {
          // TODO remove need for debounce
          const setSceneDebounced = () => {
            console.log("finished!", thing.id, thing.nextSceneId)
            this.setActiveSceneId(thing.nextSceneId)
          }
          thing.player.on('end', debounce(setSceneDebounced, 100))
        }
      })
    }

    setActiveSceneId = (activeSceneId) => {
      this.setState({activeSceneId})
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
      const thing = this.props.things.at(1)
      this.setState({
        videoId: video.token,
        libraryIsOpen: false,
        loadState: "loaded",
        timeDuration: this.props.things.timeDuration(),
        thing,
        activeSceneId: thing.sceneId, // TODO, pass this explicitly
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

        thing = this.props.things.at(nextTimePosition)
        // TODO: make sure to verify offsetTimePosition
        this.setState({
          timePosition: nextTimePosition,
          thing,
        }, () => {
          thing.player.play(thing.offsetTimePosition)
        })
      })
    }

    seekTo = (timePosition) => {
      const thing = this.props.things.at(timePosition)

      this.sound.seek(timePosition/1000)
      this.timeKeeper.pause(timePosition)
      this.setState({
        timePosition: timePosition,
        thing,
        activeSceneId: thing.sceneId,
      })

      thing.player.seekTo(thing.offsetTimePosition)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}

          things={this.props.things}

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
