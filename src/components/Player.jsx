// import DevTools from 'mobx-react-devtools'
import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Scene from 'components/Scene'
import EditorButton from 'components/EditorButton/EditorButton'
import Editor from 'components/Editor'

const style = {
  wrap: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  edit: {
    position: "absolute",
    top: 7,
    left: 0,
    zIndex: 999999,
    display: "flex",
    flexDirection: "column",
  },
  back: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 999999,
    display: "flex",
    flexDirection: "column",
  },
}

class Player extends Component {
  static propTypes = {
    activeSceneId: PropTypes.string.isRequired,
    stagedBlockId: PropTypes.string,
    video: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    addScene: PropTypes.func.isRequired,
    addBlock: PropTypes.func.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    stageBlock: PropTypes.func.isRequired,
  }

  state = {
    isBottomPanelActive: false
  }

  getStagedBlock = () => (
    this.props.stagedBlockId
    ? this.props.video.getBlock(this.props.stagedBlockId)
    : undefined
  )

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapHome = () => {
    window.location = '/'
  }

  getColor = () => {
    const block = this.getStagedBlock()

    if (block) {
      return this.getStagedColorBlock()
    } else {
      return this.getColorScene()
    }
  }

  onChangeColor = (value) => {
    const block = this.getStagedBlock()

    if (block) {
      this.onChangeColorBlock(value)
    } else {
      this.onChangeColorScene(value)
    }
  }

  getColorScene = () => {
    const defaultColor = -100
    const scene = this.props.video.getScene(this.props.activeSceneId)
    if (!scene) { return defaultColor }
    const color = scene.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  }

  onChangeColorScene = (value) => {
    const scene = this.props.video.getScene(this.props.activeSceneId)
    if (!scene) { return }
    scene.set('color_hsl', value)
  }

  getStagedColorBlock = () => {
    const defaultColor = -100
    const block = this.getStagedBlock()
    if (!block) { return defaultColor }
    const color = block.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  }

  onChangeColorBlock = (value) => {
    const block = this.getStagedBlock()
    if (!block) { return }
    block.set('color_hsl', value)
  }

  toggleBottomPanel = (open) => {
    const value = open === false ? false : !this.state.isBottomPanelActive
    this.setState({isBottomPanelActive: value})
  }

  render() {
    const scenes = this.props.video.getScenes()
    return (
      <div className="app-wrapper" style={[style.wrap, this.props.isEditing && {position: 'fixed'}]}>
        {scenes.map(scene => (
          <Scene
            key={`scenes-${scene.get('id')}`}
            isActive={scene.get('id') === this.props.activeSceneId}
            isEditing={this.props.isEditing && scene.get('id') === this.props.activeSceneId}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}
            sceneTransition={this.props.sceneTransition}
            editBlock={this.props.editBlock}
            removeBlock={this.props.removeBlock}
            stageBlock={this.props.stageBlock}
          />
        ))}

        <div style={style.edit}>
          <EditorButton
            onTap={this.handleTapHome}
            dark
          >
            <div>{"🏠"}</div>
          </EditorButton>
        </div>

        {!this.props.isEditing && (
          <div style={style.back}>
            <EditorButton
              onTap={this.handleTapLeft}
              disabled={this.props.video.getScenePosition(this.props.activeSceneId) <= 1}
              bigger
            >
              <div style={{transform: "rotate(180deg)"}}>
                {"➜"}
              </div>
            </EditorButton>
          </div>
        )}

        {this.props.isEditing && (
          <Editor
            {...this.props}
            toggleBottomPanel={this.toggleBottomPanel}
            getStagedBlock={this.getStagedBlock}
            isBottomPanelActive={this.state.isBottomPanelActive}
            getColor={this.getColor}
            onChangeColor={this.onChangeColor}
          />
        )}
      </div>
    )
  }
}

export default observer(Radium(Player))
