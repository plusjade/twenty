import Background               from 'containers/Background'
import Characters               from 'containers/Characters'
import List                     from 'containers/List/List'

import Radium                   from 'radium'
import React, {PureComponent}   from 'react'
import PropTypes                from 'prop-types'
import Hammer                   from 'react-hammerjs'

import PlayerControls       from 'components/PlayerControls/PlayerControls'
import Layer                from 'components/Layer/Layer'
import StartOverlay         from 'components/StartOverlay'

import WordsScene           from 'words/containers/WordsScene/WordsScene'
import TextingScene         from 'texting/containers/TextingScene'
import TextEditorScene      from 'textEditor/containers/TextEditorScene/TextEditorScene'
import QuizScene            from 'quiz/containers/QuizScene/QuizScene'

function imageTween(node) {
  return (
    new window.TimelineLite()
          .to(node, 1, {y: 0}, "+=8")
  )
}

function bgTween(node) {
  return (
    new window.TimelineLite()
          .to(node, 2, {backgroundColor: "#212121"})
          .to(node, 0.3, {xPercent: -100}, "+=5.5")
  )
}

const style = {
  wrap: {
    position: "fixed",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
}

const SCENE_MAP = {
  "quiz": QuizScene,
}

class Player extends PureComponent {
  static propTypes = {
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    scene: PropTypes.object.isRequired,
    mountBot: PropTypes.func.isRequired,
    sceneTypes: PropTypes.array.isRequired,
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

  sceneFactory = (scene, index) => {
    const props = {
      key: `${scene.type}${index}`,
      ownSceneIndex: index,
      sceneIndex: this.props.scene.index,
      mountBot: this.props.mountBot,
      isActive: this.props.scene.index === index,
      pause: this.props.pause,
      play: this.props.play,
      isPlaying: this.props.isPlaying,
      scene: scene,
    }
    switch(scene.type) {
      case "words": {
        return (
          <WordsScene {...props} />
        )
      }
      case "quiz": {
        return (
          <QuizScene {...props} />
        )
      }
      case "texting": {
        return (
          <TextingScene {...props} />
        )
      }
      case "editor": {
        return (
          <TextEditorScene {...props} />
        )
      }
      default: {
        throw new RangeError(`unrecognized sceneType: ${scene.type}`)
      }
    }
  }

  render() {
    return (
      <div id="app-wrapper" style={style.wrap}>
        <Background
          tween={bgTween}
          timeDuration={this.props.timeDuration}
          isPlaying={this.props.isPlaying}
        />

        <Background
          style={{
            backgroundColor: "transparent",
            backgroundImage: "url(https://static.sketchucation.com/webshop/images/water-color-tree-sample-2.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom left",
            transform: "translateY(300px)"
          }}
          tween={imageTween}
          timeDuration={this.props.timeDuration}
          isPlaying={this.props.isPlaying}
        />

        {this.props.sceneTypes.length > 0 && (
          this.props.scenes.map(this.sceneFactory)
        )}

        <Characters
          timeDuration={this.props.timeDuration}
          isPlaying={this.props.isPlaying}
        />






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
