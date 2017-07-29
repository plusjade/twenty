import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import PlayerControls       from 'components/PlayerControls/PlayerControls'
import InitialOverlay       from 'components/InitialOverlay'

import Library              from 'containers/Library/Library'
import StylesWrapper        from 'styles/Wrapper'

import SlidesScene          from 'slides/containers/SlidesScene'
import TextingScene         from 'texting/containers/TextingScene'
import TextEditorScene      from 'textEditor/containers/TextEditorScene'


import Hammer from 'react-hammerjs'

class Player extends Component {
  constructor(props) {
    super(props)

    this.initialState = this.initialState.bind(this)
    this.resetState = this.resetState.bind(this)
    this.state = this.initialState()
  }

  initialState() {
    return ({
      libraryDistance: 0
    })
  }

  resetState() {
    this.setState(this.initialState())
  }

  render() {
    // Only show overlay state on initial load lifecycle
    // i.e. before video is loaded/played for first time
    const showOverlay = this.props.loadState && !(this.props.timePosition > 0)
    const controlsStyle = Object.assign(
      {},
      StylesWrapper.controls
    )
    return (
      <Hammer
        onPan={(e) => {
          window.requestAnimationFrame(() => {
            this.setState({libraryDistance: e.distance})
          })
        }}
        direction={"DIRECTION_DOWN"}
        onPanEnd={(e) => {
          if (this.state.libraryDistance < 200) {
            let count = Number(e.distance)
            while (count <= 300) {
              count += 10
              window.requestAnimationFrame(() => {
                this.setState({libraryDistance: count})
              })
            }
          }
        }}
      >
        <div id="app-wrapper">
          <div id="editor-result" style={StylesWrapper.editorResult}>
          {this.props.sceneTypes.includes("texting") && (
            <TextingScene
              mountBot={this.props.mountBot}
              isActive={this.props.scene.type === "texting"}
            />
          )}

          {this.props.sceneTypes.includes("slides") && (
            <SlidesScene
              mountBot={this.props.mountBot}
              isActive={this.props.scene.type === "slides"}
            />
          )}

          {this.props.sceneTypes.includes("editor") && (
            <TextEditorScene
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
          </div>
          <div id="controls" style={controlsStyle}>
            <PlayerControls
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
        </div>
      </Hammer>
    )
  }
}

Player.propTypes = {
  libraryIsOpen: PropTypes.bool,
  videosDB: PropTypes.object.isRequired,
  loadVideo: PropTypes.func.isRequired,
}

export default Player
