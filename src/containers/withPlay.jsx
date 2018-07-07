import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable, reaction } from "mobx"
import randomEmoji from 'db/randomEmoji'

const withPlay = (WrappedComponent) => {
  class withPlay extends Component {
    static propTypes = {
      video: PropTypes.object.isRequired,
      canEdit: PropTypes.bool,
    }

    constructor(props) {
      const activeSceneId = props.video.getInitialSceneId()
      let lastSceneId = undefined
      super(props)
      this.activeSceneId = observable.box(activeSceneId)

      this.state = {
        activeSceneId,
        initialSceneId: activeSceneId,
        lastSceneId: undefined,
      }

      reaction(
        () => this.activeSceneId.get(),
        (activeSceneId) => {
          this.play(activeSceneId, lastSceneId)
          lastSceneId = activeSceneId
        }
      )
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
          lastSceneId: this.state.activeSceneId,
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

    play = (activeSceneId, lastSceneId) => {
      if (this.props.canEdit) {
        this.unStageBlock()
      }
      this.props.video
        .getBlocksInScene(activeSceneId)
        .forEach((block) => {
          block.set('lifecycle', 'play')
        })

      if (lastSceneId) {
        this.props.video
          .getBlocksInScene(lastSceneId)
          .forEach((block) => {
            block.set('lifecycle', 'sleep')
          })
      }
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
          const block = this.props.video.getBlock(blockId)
          if (block) {
            block.set('lifecycle', 'end')
          }
        }
        if (callback) { callback() }
      })
    }

    addBlock = (type = 'words') => {
      const block = this.props.video.addBlock({
        type,
        content: `${randomEmoji()} HEADING`,
        sceneId: this.state.activeSceneId,
      })
      this.stageBlock(block.get('id'))
      setTimeout(() => {
        block.set('lifecycle', 'play')
      }, 100) // TODO FIXME
    }

    addScene = () => {
      const sceneId = this.props.video.addScene(this.state.activeSceneId)
      this.setActiveSceneId(sceneId)
    }

    toggleEditText = () => {
      this.setState({
        isEditingText: !this.state.isEditingText,
      })
    }

    setActiveSceneId = (activeSceneId) => {
      this.setState({activeSceneId}, () => {
        this.activeSceneId.set(activeSceneId)
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
          setActiveSceneId={this.setActiveSceneId}
        />
      )
    }
  }

  return withPlay
}

export default withPlay
