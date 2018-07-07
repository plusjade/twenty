// import DevTools from 'mobx-react-devtools'
import 'intersection-observer'

import { observer } from "mobx-react"
import { observable, reaction } from "mobx"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Layer from 'components/Layer/Layer'
import Scene from 'components/Scene/Scene'
import ActionTap from 'components/ActionTap/ActionTap'
import Editor from 'components/Editor'
import randomEmoji from 'db/randomEmoji'
import style from './style'

class Player extends Component {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    video: PropTypes.object.isRequired,
  }

  constructor(props) {
    const activeSceneId = props.video.getInitialSceneId()
    let lastSceneId
    super(props)
    this.activeSceneId = observable.box(activeSceneId)

    this.state = {
      initialSceneId: activeSceneId,
      lastSceneId: undefined,
      stagedBlockId: undefined,

      isBottomPanelActive: false,
      isAddBlockActive: false,
      isScenesMenuActive: false,
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
      } else if (option === 'prev' && this.activeSceneId.get() === this.state.initialSceneId) {
        // do nothing
      } else if (this.props.video.getScene(sceneTransitions.next)) {
        nextScene = sceneTransitions.next
      }
    } else if (this.props.video.getScene(sceneTransitions.next)) {
      nextScene = sceneTransitions.next
    }

    if (nextScene) {
      this.activeSceneId.set(nextScene)
    } else {
      // throw new Error('nowhere to go')
      console.error('nowhere to go')
    }
  }

  // Find the module in the current step that has the step_transition metadata
  derivedSceneTransitions() {
    return this.props.video.getScene(this.activeSceneId.get()).get('transitions')
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
      sceneId: this.activeSceneId.get(),
    })
    this.stageBlock(block.get('id'))
    setTimeout(() => {
      block.set('lifecycle', 'play')
    }, 100) // TODO FIXME
  }

  addScene = () => {
    const sceneId = this.props.video.addScene(this.activeSceneId.get())
    this.activeSceneId.set(sceneId)
  }

  toggleEditText = () => {
    this.setState({
      isEditingText: !this.state.isEditingText,
    })
  }

  handleTapRight = () => {
    this.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.sceneTransition({option: 'prev'})
  }

  toggleBottomPanel = ({toggle, type} = {}) => {
    const value = toggle === 'close' ? false : !this.state.isBottomPanelActive
    if (value) {
      this.setState({isBottomPanelActive: type})
    } else {
      this.setState({isBottomPanelActive: false})
    }
  }

  blocksMenuToggle = (open) => {
    const value = open === false ? false : !this.state.isAddBlockActive
    this.setState({isAddBlockActive: value})
  }

  scenesMenuToggle = () => {
    this.setState({isScenesMenuActive: !this.state.isScenesMenuActive}, () => {
      if (this.state.isScenesMenuActive) {
        this.unStageBlock()
      } else {
        this.toggleBottomPanel({toggle: 'close'})
      }
    })
  }

  getActiveScene = () => this.props.video.getScene(this.activeSceneId.get())

  render() {
    const scenes = this.props.video.getScenes()
    return (
      <div
        className="app-wrapper"
        style={[
          this.props.isHorizontal && style.horizontalScroll,
          this.props.isHorizontal && {width: `${(scenes.length * 100)}vw`},
        ]}
      >
        {scenes.map(scene => (
          <Scene
            key={`scenes-${scene.get('id')}`}
            canEdit={this.props.canEdit}
            isEditing={this.props.canEdit && scene.get('id') === this.activeSceneId.get()}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}

            sceneTransition={this.sceneTransition}
            editBlock={this.editBlock}
            removeBlock={this.removeBlock}
            stageBlock={this.stageBlock}
            unStageBlock={this.unStageBlock}
            activeSceneId={this.activeSceneId}
          />
        ))}

        {this.props.canEdit && (
          <Editor
            {...this.props}
            {...this.state}

            getActiveScene={this.getActiveScene}
            isEditing={this.props.canEdit}
            sceneTransition={this.sceneTransition}
            addScene={this.addScene}
            addBlock={this.addBlock}
            editBlock={this.editBlock}
            removeBlock={this.removeBlock}
            stageBlock={this.stageBlock}
            unStageBlock={this.unStageBlock}

            toggleBottomPanel={this.toggleBottomPanel}
            blocksMenuToggle={this.blocksMenuToggle}
            scenesMenuToggle={this.scenesMenuToggle}
          />
        )}
      </div>
    )
  }
}

export default observer(Radium(Player))
