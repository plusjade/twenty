import React, { Component } from 'react'
import PropTypes from 'prop-types'
import randomEmoji from 'db/randomEmoji'

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    static propTypes = {
      video: PropTypes.object.isRequired,
      canEdit: PropTypes.bool.isRequired,
    }

    constructor(props) {
      super(props)
      this.state = this.initialState()
    }

    UNSAFE_componentWillMount() {
      this.setVideoData()
    }

    initialState = () => ({
      activeSceneId: null,
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
        const candidateScene = sceneTransitions[option]
        if (this.props.video.getScene(candidateScene)) {
          nextScene = candidateScene
        } else if (option === 'prev' && this.state.activeSceneId === this.state.initialSceneId) {
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

    removeBlock = (blockId) => {
      this.unStageBlock({replay: false})
      const block = this.props.video.getBlock(blockId)
      this.props.video.removeBlock(block)
    }

    editBlock = (blockId, attributes) => {
      this.props.video.editBlock(blockId, attributes)
    }

    stageBlock = (blockId) => {
      if (blockId === this.state.stagedBlockId) {
        this.unStageBlock()
      } else {
        this.unStageBlock({
          callback: () => {
            this.setState({stagedBlockId: blockId})
            this.props.video.getBlock(blockId).set('lifecycle', 'edit')
          }
        })
      }
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
        } else {
          this.props.video.getBlock(blockId).delete('lifecycle')
        }
        if (callback) { callback() }
      })
    }

    addBlock = () => {
      const block = this.props.video.addBlock({
        type: "words",
        content: randomEmoji(),
        sceneId: this.state.activeSceneId,
      })
      block.set('lifecycle', 'play')
      this.stageBlock(block.get('id'))
    }

    addScene = () => {
      const sceneId = this.props.video.addScene(this.state.activeSceneId)
      this.setState({
        activeSceneId: sceneId,
      }, this.play)
    }

    toggleEditText = () => {
      this.setState({
        isEditingText: !this.state.isEditingText,
      })
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          canEdit={this.props.canEdit}
          isEditing={this.props.canEdit}
          video={this.props.video}
          sceneTransition={this.sceneTransition}
          addScene={this.addScene}
          addBlock={this.addBlock}
          editBlock={this.editBlock}
          removeBlock={this.removeBlock}
          stageBlock={this.stageBlock}
          unStageBlock={this.unStageBlock}
          toggleEditText={this.toggleEditText}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
