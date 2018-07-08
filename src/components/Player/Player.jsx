// import DevTools from 'mobx-react-devtools'
import 'intersection-observer'

import { observer } from "mobx-react"
import { observable, reaction, action } from "mobx"
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

  state = {
    stagedBlockId: undefined,

    isBottomPanelActive: false,
    isAddBlockActive: false,
    isScenesMenuActive: false,
  }

  constructor(props) {
    const activeSceneId = props.video.getInitialSceneId()
    let lastSceneId
    super(props)
    this.stage = observable({
      blockId: null,

      get block() {
        return this.blockId ? props.video.getBlock(this.blockId) : null
      },

      stageBlock(blockId) {
        if (blockId === this.blockId) {
          this.unStageBlock()
        } else {
          this.unStageBlock({
            callback: () => {
              this.blockId = blockId
              props.video.getBlock(blockId).set('lifecycle', 'edit')
            }
          })
        }
      },

      unStageBlock({callback, replay} = {}) {
        if (!this.blockId) {
          if (callback) { callback() }
          return
        }

        const blockId = this.blockId
        this.blockId = null // may have to wait for a little?
        if (replay) {
          props.video.getBlock(blockId).set('lifecycle', 'replay')
        } else {
          const block = props.video.getBlock(blockId)
          if (block) {
            block.set('lifecycle', 'end')
          }
        }
        if (callback) { callback() }
      },

    }, {
      stageBlock: action,
      unStageBlock: action,
    })

    this.player = observable({
      initialSceneId: activeSceneId,
      activeSceneId: activeSceneId,
      lastSceneId: null,

      setActiveSceneId(sceneId) {
        this.activeSceneId = sceneId
      },

      get activeScene() {
        return props.video.getScene(this.activeSceneId)
      },

      get activeBlocks() {
        return props.video.getBlocksInScene(this.activeSceneId) || []
      },

      get activeScenePosition() {
        return props.video.getScenePosition(this.activeSceneId)
      },
    }, {
      setActiveSceneId: action
    })
    reaction(
      () => this.player.activeSceneId,
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
      } else if (option === 'prev' && this.player.activeSceneId === this.player.initialSceneId) {
        // do nothing
      } else if (this.props.video.getScene(sceneTransitions.next)) {
        nextScene = sceneTransitions.next
      }
    } else if (this.props.video.getScene(sceneTransitions.next)) {
      nextScene = sceneTransitions.next
    }

    if (nextScene) {
      this.player.setActiveSceneId(nextScene)
    } else {
      // throw new Error('nowhere to go')
      console.error('nowhere to go')
    }
  }

  // Find the module in the current step that has the step_transition metadata
  derivedSceneTransitions() {
    return this.player.activeScene.get('transitions')
  }

  play = (activeSceneId, lastSceneId) => {
    if (this.props.canEdit) {
      this.stage.unStageBlock()
    }

    this.player.activeBlocks.forEach((block) => {
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
    this.stage.unStageBlock({replay: false})
    const block = this.props.video.getBlock(blockId)
    this.props.video.removeBlock(block)
  }

  editBlock = (blockId, attributes) => {
    this.props.video.editBlock(blockId, attributes)
  }

  addBlock = (type = 'words') => {
    const block = this.props.video.addBlock({
      type,
      content: `${randomEmoji()} HEADING`,
      sceneId: this.player.activeSceneId,
    })
    this.stage.stageBlock(block.get('id'))
    setTimeout(() => {
      block.set('lifecycle', 'play')
    }, 100) // TODO FIXME
  }

  addScene = () => {
    const sceneId = this.props.video.addScene(this.player.activeSceneId)
    this.player.setActiveSceneId(sceneId)
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
        this.stage.unStageBlock()
      } else {
        this.toggleBottomPanel({toggle: 'close'})
      }
    })
  }

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
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}
            player={this.player}
            sceneTransition={this.sceneTransition}

            canEdit={this.props.canEdit}
            isEditing={this.props.canEdit && scene.get('id') === this.player.activeSceneId}
            editBlock={this.editBlock}
            removeBlock={this.removeBlock}

            stage={this.stage}
          />
        ))}

        {this.props.canEdit && (
          <Editor
            {...this.props}
            {...this.state}

            player={this.player}
            isEditing={this.props.canEdit}
            sceneTransition={this.sceneTransition}

            addScene={this.addScene}
            addBlock={this.addBlock}
            editBlock={this.editBlock}
            removeBlock={this.removeBlock}

            stage={this.stage}

            toggleEditText={this.toggleEditText}
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
