import Radium                   from 'radium'
import React, {PureComponent}   from 'react'
import PropTypes                from 'prop-types'
import Hammer                   from 'react-hammerjs'

import PlayerControls       from 'components/PlayerControls/PlayerControls'
import Layer                from 'components/Layer/Layer'
import StartOverlay         from 'components/StartOverlay'
import Scene                from 'components/Scene'

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
    video: PropTypes.object.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isPlayable: PropTypes.bool.isRequired,
    replay: PropTypes.func.isRequired,
    seekTo: PropTypes.func.isRequired,
    timeDuration: PropTypes.number.isRequired,
    timePosition: PropTypes.number,
  }

  handleTapToPause = () => {
    this.props.pause()
  }

  // Only show overlay state on initial load lifecycle
  // i.e. before video is loaded/played for first time
  showStartOverlay = () => (
    this.props.loadState && !(this.props.timePosition > 0)
  )

  render() {
    return (
      <div id="app-wrapper" style={style.wrap}>
        {this.props.video.getScenes().map(scene => (
          <Scene
            key={`scenes-${scene.id}`}
            isActive={scene.id == this.props.activeSceneId}
            scene={scene}
            blocks={this.props.video.getBlocksInScene(scene.id)}

            pause={this.props.pause}
            play={this.props.play}
            isPlaying={this.props.isPlaying}

            setActiveSceneId={this.props.setActiveSceneId}
          />
        ))}

        {this.showStartOverlay() && (
          <StartOverlay
            loadState={this.props.loadState}
            play={this.props.play}
            active={true}
          />
        )}

        <Hammer onTap={this.handleTapToPause}>
          <Layer isHidden={!this.props.isPlaying}>
            <div />
          </Layer>
        </Hammer>

        <PlayerControls
          isActive={!this.showStartOverlay() && !this.props.isPlaying}
          isPlaying={this.props.isPlaying}
          isPlayable={this.props.isPlayable}
          pause={this.props.pause}
          play={this.props.play}
          replay={this.props.replay}
          seekTo={this.props.seekTo}
          timeDuration={this.props.timeDuration}
          timePosition={this.props.timePosition}
        />
      </div>
    )
  }
}

export default Radium(Player)
