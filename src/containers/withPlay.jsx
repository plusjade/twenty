import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import { findVideo }        from 'lib/actions'

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    static propTypes = {
      videoId: PropTypes.string.isRequired,
    }

    constructor(props) {
      super(props)
      this.state = this.initialState()
    }

    componentWillMount() {
      if (this.state.videoId) {
        this.loadVideo(this.state.videoId)
      }

      this.props.video.getBlocks().forEach((block) => {
        block.player.on('start', () => {
          console.log(block.id, "^_^ start!", block.transitions.next)
        })

        block.player.on('end', () => {
          console.log(block.id, "^_^ finished!", block.transitions.next)
        })
      })
    }

    initialState = () => ({
      libraryIsOpen: false,
      loadState: undefined,
      timeDuration: 0,
      videoId: this.props.videoId,
      activeSceneId: null,
      isEditing: false,
    })

    resetState = () => {
      this.setState(this.initialState())
    }

    loadVideo = (videoId) => {
      this.setState({loadState: "loading", libraryIsOpen: false})
      findVideo(videoId)
        .then((video) => {
          if (video) {
            if (!window.location.search.includes("id")) {
              window.history.replaceState({}, null, `/?id=${videoId}`)
            }
            this.setVideoData(video)
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
      }, this.play)
    }

    toggleLibrary = () => {
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
    }

    setStart = () => {
      this.resetState()
    }

    sceneTransition = (data = {}) => {
      const {option, ...props} = data
      const sceneTransitions = this.derivedSceneTransitions()
      let nextScene

      console.log('sceneTransition', option)
      console.log("derived", this.state.activeSceneId, sceneTransitions)

      if (option) {
        let candidateScene = sceneTransitions[option]
        if (this.props.video.getScene(candidateScene)) {
          nextScene = candidateScene

        } else if (this.props.video.getScene(sceneTransitions.next)) {
          nextScene = sceneTransitions.next
        }
      } else if (this.props.video.getScene(sceneTransitions.next)) {
        nextScene = sceneTransitions.next
      }

      if (nextScene) {
        this.setState({
          activeSceneId: nextScene,
          nextScenePayload: props
        }, this.play)
      } else {
        // throw new Error('nowhere to go')
        console.error('nowhere to go')
      }
    }

    // Find the module in the current step that has the step_transition metadata
    derivedSceneTransitions() {
      return this.props.video.getBlocksInScene(this.state.activeSceneId)[0].transitions
    }

    pause = (time) => {
      this.props.video
        .getBlocksInScene(this.state.activeSceneId)
        .forEach((block) => { block.player.pause() })
    }

    replay = () => {
      this.setStart()
      this.play()
    }

    play = () => {
      this.props.video
        .getBlocksInScene(this.state.activeSceneId)
        .forEach((block) => {
          block.player.play()
        })
    }

    seekTo = (sceneId) => {
      this.setState({
        activeSceneId: sceneId,
      })
    }

    toggleEditMode = () => {
      this.setState({isEditing: !this.state.isEditing}, () => {
        if (!this.state.isEditing) {
          const blocks = this.props.video.getBlocksInScene(this.state.activeSceneId)
          blocks.forEach((block) => {
            block.player.replay()
          })
        }
      })
    }

    isInteractive() {
      if (this.state.isEditing) { return true }
      if (!this.state.activeSceneId) { return false }
      return !!(
        this.props.video
          .getBlocksInScene(this.state.activeSceneId)
          .find(block => block.isInteractive)
      )
    }

    editBlock = (block, attributes) => {
      console.log('editBlock', attributes)
      this.setState({editBlockId: block.id})
      block.data = {...block.data, ...attributes}
      this.props.video.addBlock(block)
    }

    addBlock = () => {
      this.props.video.addBlock(
        {
          type: "words",
          data: {
            content: "Hokay =)",
            effect: 'fadeIn',
          },
          offset: 400,
          sceneId: "emoji",
        },
      )
      this.setState({entropy: Math.random()})
    }

    render() {
      const scenes = this.props.video.getScenes().map((scene) => {
        scene.blocks = this.props.video.getBlocksInScene(scene.id)
        return scene
      })
      return (
        <WrappedComponent
          {...this.state}

          scenes={scenes}
          isInteractive={this.isInteractive()}
          sceneTransition={this.sceneTransition}
          toggleEditMode={this.toggleEditMode}
          editBlock={this.editBlock}
          addBlock={this.addBlock}

          play={this.play}
          pause={this.pause}
          replay={this.replay}

          toggleLibrary={this.toggleLibrary}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
