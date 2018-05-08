import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import { findVideo }        from 'lib/actions'
import randomEmoji from 'db/randomEmoji'

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    static propTypes = {
      video: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props)
      this.state = this.initialState()
    }

    componentWillMount() {
      this.setVideoData()
      if (this.props.canEdit) {
        this.setState({isEditing: true})
      }
    }

    initialState = () => ({
      activeSceneId: null,
      isEditing: false,
    })

    resetState = () => {
      this.setState(this.initialState())
    }

    setVideoData = () => {
      this.resetState() // todo
      const activeSceneId = this.props.video.getInitialSceneId()
      this.setState({
        activeSceneId,
        initialSceneId: activeSceneId,
      }, this.play)
    }

    sceneTransition = (data = {}) => {
      const {option, ...props} = data
      const sceneTransitions = this.derivedSceneTransitions()
      let nextScene

      if (option) {
        let candidateScene = sceneTransitions[option]
        if (this.props.video.getScene(candidateScene)) {
          nextScene = candidateScene
        } else if (option === 'prev' && this.state.activeSceneId == this.state.initialSceneId) {
          // do nothing
        } else if (this.props.video.getScene(sceneTransitions.next)) {
          nextScene = sceneTransitions.next
        }
      } else if (this.props.video.getScene(sceneTransitions.next)) {
        nextScene = sceneTransitions.next
      }

      if (nextScene) {
        this.setState({
          activeSceneId: nextScene,
          nextScenePayload: props,
        }, this.play)
      } else {
        // throw new Error('nowhere to go')
        console.error('nowhere to go')
      }
    }

    // Find the module in the current step that has the step_transition metadata
    derivedSceneTransitions() {
      return this.props.video.getScene(this.state.activeSceneId).get('transitions')
    }

    play = () => {
      this.unStageBlock()
      this.props.video
        .getBlocksInScene(this.state.activeSceneId)
        .forEach((block) => {
          block.set('lifecycle', 'play')
        })
    }

    toggleEditMode = () => {
      this.setState({isEditing: !this.state.isEditing}, () => {
        if (!this.state.isEditing) {
          const blocks = this.props.video.getBlocksInScene(this.state.activeSceneId)
          blocks.forEach((block) => {
            block.set('lifecycle', 'replay')
          })
          this.unStageBlock()
        }
      })
    }

    // some blocks are interactive so the tap overlays shouldnt render
    isInteractive() {
      if (this.state.isEditing) { return true }
      if (!this.state.activeSceneId) { return false }
      return !!(
        this.props.video
          .getBlocksInScene(this.state.activeSceneId)
          .find(block => block.isInteractive)
      )
    }

    removeBlock = (blockId) => {
      this.unStageBlock({replay: false})
      const block = this.props.video.getBlock(blockId)
      this.props.video.removeBlock(block)
    }

    editBlock = (blockId, attributes) => {
      const block = this.props.video.getBlock(blockId)
      console.log('editBlock', block, attributes)
      const data = {...block.get('data'), ...attributes}
      this.props.video.editBlock(block.get('id'), {data})
      block.set('lifecycle', 'replay')
      this.unStageBlock()
    }

    stageBlock = (blockId) => {
      this.unStageBlock({callback: ()=> {
        this.setState({stagedBlockId: blockId})
        this.props.video.getBlock(blockId).set('lifecycle', 'edit')
      }})
    }

    unStageBlock = ({callback, replay} = {}) => {
      if (!this.state.stagedBlockId) {
        if (callback) { callback() }
        return
      }
      const blockId = this.state.stagedBlockId
      this.setState({stagedBlockId: undefined}, () => {
        if (replay) {
          this.props.video.getBlock(blockId).set('lifecycle', 'replay')
        }
        if (callback) { callback() }
      })
    }

    addBlock = () => {
      const block = this.props.video.addBlock(
        {
          type: "words",
          data: {
            content: randomEmoji(),
          },
          sceneId: this.state.activeSceneId,
        },
      )
      block.set('lifecycle', 'play')
      this.unStageBlock()
    }

    addScene = () => {
      const sceneId = this.props.video.addScene(this.state.activeSceneId)
      this.setState({
        activeSceneId: sceneId,
      }, this.play)
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          canEdit={this.props.canEdit}
          video={this.props.video}
          isInteractive={this.isInteractive()}
          sceneTransition={this.sceneTransition}
          toggleEditMode={this.toggleEditMode}

          addScene={this.addScene}
          addBlock={this.addBlock}
          editBlock={this.editBlock}
          removeBlock={this.removeBlock}
          stageBlock={this.stageBlock}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
