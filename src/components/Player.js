import Radium                   from 'radium'
import React, {PureComponent}   from 'react'
import PropTypes                from 'prop-types'
import Hammer                   from 'react-hammerjs'

import PlayerControls       from 'components/PlayerControls/PlayerControls'
import Layer                from 'components/Layer/Layer'
import InitialOverlay       from 'components/InitialOverlay'

import WordsScene           from 'words/containers/WordsScene/WordsScene'
import TextingScene         from 'texting/containers/TextingScene'
import TextEditorScene      from 'textEditor/containers/TextEditorScene/TextEditorScene'
import QuizScene            from 'quiz/containers/QuizScene/QuizScene'
import StylesWrapper        from 'styles/Wrapper'

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
  showOverlay = () => (
    this.props.loadState && !(this.props.timePosition > 0)
  )

  render() {
    return (
      <div id="app-wrapper" style={StylesWrapper.wrap}>
        {this.props.sceneTypes.includes("quiz") && (
          <QuizScene
            sceneIndex={this.props.scene.index}
            mountBot={this.props.mountBot}
            isActive={this.props.scene.type === "quiz"}
            pause={this.props.pause}
            play={this.props.play}
          />
        )}

        {this.props.sceneTypes.includes("texting") && (
          <TextingScene
            sceneIndex={this.props.scene.index}
            mountBot={this.props.mountBot}
            isActive={this.props.scene.type === "texting"}
          />
        )}

        {this.props.sceneTypes.includes("words") && (
          <WordsScene
            sceneIndex={this.props.scene.index}
            mountBot={this.props.mountBot}
            isActive={this.props.scene.type === "words"}
            isPlaying={this.props.isPlaying}
          />
        )}

        {this.props.sceneTypes.includes("editor") && (
          <TextEditorScene
            sceneIndex={this.props.scene.index}
            mountBot={this.props.mountBot}
            isActive={this.props.scene.type === "editor"}
          />
        )}

        {this.showOverlay() && (
          <InitialOverlay
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
          isActive={!this.showOverlay() && !this.props.isPlaying}
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
