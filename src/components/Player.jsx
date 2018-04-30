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
  editBlocks: {
    default: {
      position: "fixed",
      top: 2,
      right: -70,
      zIndex: 21,
      display: "flex",
      flexDirection: "column",
      transition: "all 200ms ease-in-out",
    },
    active: {
      right: 0,
    },
  },
  editScenes: {
    default: {
      position: "fixed",
      bottom: -85,
      left: 0,
      right: 0,
      zIndex: 21,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 200ms ease-in-out",
    },
    active: {
      bottom: 0,
    }
  },
  edit: {
    position: "fixed",
    top: 2,
    left: 0,
    zIndex: 21,
    display: "flex",
    flexDirection: "column",
  },
  editItem: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 45,
    margin: "1px 5px",
    textAlign: "center",
    fontSize: "2.8vh",
    fontWeight: 600,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,1)",
    color: "#212121",
    textShadow: "-1px 1px 0 #FFF, 1px 1px 0 #FFF, 1px -1px 0 #FFF, -1px -1px 0 #FFF",
  },
  editItemBigger: {
    height: 60,
    width: 60,
  }
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

  handleTapLeft = (e) => {
    console.log('handleTapLeft', e)
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapEdit = () => {
    this.props.toggleEditMode()
  }

  handleTapWords = () => {
    this.props.addBlock()
  }

  handleTapScene = () => {
    this.props.addScene()
  }

  // Only show overlay state on initial load lifecycle
  // i.e. before video is loaded/played for first time
  showStartOverlay = () => (
    false
  )

  render() {
    const scenes = this.props.video.getScenes()
    const totalScenes = scenes.length
    const scenePosition = this.props.video.getScenePosition(this.props.activeSceneId)
    return (
      <div id="app-wrapper" style={style.wrap}>
        {scenes.map(scene => (
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

        <div
          style={[
            style.editBlocks.default,
            this.props.isEditing && style.editBlocks.active
          ]}
        >
          <Hammer onTap={this.handleTapWords}>
            <div style={style.editItem}>
              <div>{"T"}</div>
            </div>
          </Hammer>
        </div>

        <div
          style={[
            style.editScenes.default,
            this.props.isEditing && style.editScenes.active
          ]}
        >
          <Hammer onTap={this.handleTapScene}>
            <div style={style.editItem}>
              <div>{"✖️"}</div>
            </div>
          </Hammer>

          <Hammer onTap={this.handleTapLeft}>
            <div style={[style.editItem, {transform: "rotate(180deg)"}]}>
              <div>{"➜"}</div>
            </div>
          </Hammer>

          <div
            style={[
              style.editItem,
              style.editItemBigger,
              {fontSize: "2.5vh"},
            ]}
          >
            <div>
              {`${scenePosition}/${totalScenes}`}
            </div>
          </div>

          <Hammer onTap={this.handleTapRight}>
            <div style={style.editItem}>
              <div>{"➜"}</div>
            </div>
          </Hammer>


          <Hammer onTap={this.handleTapScene}>
            <div style={style.editItem}>
              <div>{"🎬"}</div>
            </div>
          </Hammer>

        </div>

        <div style={style.edit}>
          {this.props.isEditing && (
            <Hammer onTap={this.handleTapEdit}>
              <div style={style.editItem}>
                <div>{"✔"}</div>
              ️</div>
            </Hammer>
          )}
          {!this.props.isEditing && (
            <Hammer onTap={this.handleTapEdit}>
              <div style={[style.editItem, {transform: "rotate(180deg)"}]}>
                <div>{"✐"}</div>
              ️</div>
            </Hammer>
          )}
        </div>
      </div>
    )
  }
}

export default Radium(observer(Player))
