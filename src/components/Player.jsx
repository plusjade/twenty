import { observer } from "mobx-react"
import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import Layer from 'components/Layer/Layer'
import StartOverlay from 'components/StartOverlay'
import Scene from 'components/Scene'

const style = {
  wrap: {
    position: "fixed",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  edit: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 21,
    display: "flex",
    flexDirection: "column-reverse",
  },
  editItem: {
    height: 60,
    width: 60,
    lineHeight: "50px",
    textAlign: "center",
    fontSize: "4.5vh",
    fontWeight: 600,
  },
}

class Player extends PureComponent {
  static propTypes = {
    activeSceneId: PropTypes.string,
    video: PropTypes.object.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    timeDuration: PropTypes.number.isRequired,
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = () => {
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapEdit = () => {
    this.props.toggleEditMode()
  }

  handleTapWords = () => {
    this.props.addBlock()
  }

  // Only show overlay state on initial load lifecycle
  // i.e. before video is loaded/played for first time
  showStartOverlay = () => (
    false
  )

  render() {
    return (
      <div id="app-wrapper" style={style.wrap}>
        {this.props.video.getScenes().map(scene => (
          <Scene
            key={`scenes-${scene.get('id')}`}
            isActive={scene.get('id') === this.props.activeSceneId}
            isEditing={this.props.isEditing && scene.get('id') === this.props.activeSceneId}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.get('id'))}
            sceneTransition={this.props.sceneTransition}
            editBlock={this.props.editBlock}
          />
        ))}

        {this.showStartOverlay() && (
          <StartOverlay
            loadState={this.props.loadState}
            play={this.props.play}
            active
          />
        )}

        <Hammer onTap={this.handleTapLeft}>
          <Layer
            isHidden={this.props.isInteractive}
            style={{right: "80%"}}
          />
        </Hammer>

        <Hammer onTap={this.handleTapRight}>
          <Layer
            isHidden={this.props.isInteractive}
            style={{left: "20%"}}
          />
        </Hammer>

        <div style={style.edit}>
          {this.props.isEditing && (
            <Hammer onTap={this.handleTapEdit}>
              <div style={style.editItem}>
                ✔
              ️</div>
            </Hammer>
          )}
          {!this.props.isEditing && (
            <Hammer onTap={this.handleTapEdit}>
              <div style={style.editItem}>
                {"✍️"}
              ️</div>
            </Hammer>
          )}
          {this.props.isEditing && (
            <Hammer onTap={this.handleTapWords}>
              <div style={style.editItem}>
                {"T"}
              </div>
            </Hammer>
          )}
        </div>

      </div>
    )
  }
}

export default Radium(observer(Player))
