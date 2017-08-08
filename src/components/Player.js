import Radium               from 'radium'
import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import Hammer               from 'react-hammerjs'

import PlayerControls       from 'components/PlayerControls/PlayerControls'
import Layer                from 'components/Layer/Layer'
import InitialOverlay       from 'components/InitialOverlay'

import Library              from 'containers/Library/Library'
import StylesWrapper        from 'styles/Wrapper'

import SlidesScene          from 'slides/containers/SlidesScene/SlidesScene'
import TextingScene         from 'texting/containers/TextingScene'
import TextEditorScene      from 'textEditor/containers/TextEditorScene/TextEditorScene'
import QuizScene            from 'quiz/containers/QuizScene/QuizScene'

class Player extends Component {
  constructor(props) {
    super(props)

    this.initialState = this.initialState.bind(this)
    this.resetState = this.resetState.bind(this)
    this.state = this.initialState()

    this.handleTapToPause = this.handleTapToPause.bind(this)
  }

  initialState() {
    return ({
      libraryDistance: 0
    })
  }

  resetState() {
    this.setState(this.initialState())
  }

  handleTapToPause() {
    this.props.pause()
  }

  render() {
    // Only show overlay state on initial load lifecycle
    // i.e. before video is loaded/played for first time
    const showOverlay = this.props.loadState && !(this.props.timePosition > 0)
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

        {this.props.sceneTypes.includes("slides") && (
          <SlidesScene
            sceneIndex={this.props.scene.index}
            mountBot={this.props.mountBot}
            isActive={this.props.scene.type === "slides"}
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

        {showOverlay && (
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
          isActive={!showOverlay && !this.props.isPlaying}
          isPlaying={this.props.isPlaying}
          isPlayable={this.props.isPlayable}
          pause={this.props.pause}
          play={this.props.play}
          replay={this.props.replay}
          seekTo={this.props.seekTo}
          timeDuration={this.props.timeDuration}
          timePosition={this.props.timePosition}
          toggleLibrary={this.props.toggleLibrary}
        />
        <Library
          onSelect={(video) => { this.props.loadVideo(video.token) }}
          isOpen={this.props.libraryIsOpen}
          toggleLibrary={this.props.toggleLibrary}
          libraryDistance={this.state.libraryDistance}
          videosDB={this.props.videosDB}
        />
      </div>
    )
  }
}

Player.propTypes = {
  libraryIsOpen: PropTypes.bool,
  videosDB: PropTypes.object.isRequired,
  loadVideo: PropTypes.func.isRequired,
}

export default Radium(Player)
