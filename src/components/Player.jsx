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
}

class Player extends PureComponent {
  static propTypes = {
    activeSceneId: PropTypes.string,
    video: PropTypes.object.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isPlayable: PropTypes.bool.isRequired,
    timeDuration: PropTypes.number.isRequired,
    timePosition: PropTypes.number,
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = () => {
    this.props.sceneTransition({option: 'prev'})
  }

  // Only show overlay state on initial load lifecycle
  // i.e. before video is loaded/played for first time
  showStartOverlay = () => (
    false
    // this.props.loadState && !(this.props.timePosition > 0)
  )

  isInteractive() {
    if (!this.props.activeSceneId) { return false }
    return !!(
      this.props.video
        .getBlocksInScene(this.props.activeSceneId)
        .find(block => block.isInteractive)
    )
  }

  render() {
    return (
      <div id="app-wrapper" style={style.wrap}>
        {this.props.video.getScenes().map(scene => (
          <Scene
            key={`scenes-${scene.id}`}
            isActive={scene.id === this.props.activeSceneId}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.id)}
            isPlaying={this.props.isPlaying}
            sceneTransition={this.props.sceneTransition}
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
            isHidden={this.isInteractive()}
            style={{right: "80%"}}
          />
        </Hammer>
        <Hammer onTap={this.handleTapRight}>
          <Layer
            isHidden={this.isInteractive()}
            style={{left: "20%"}}
          />
        </Hammer>
      </div>
    )
  }
}

export default Radium(Player)
