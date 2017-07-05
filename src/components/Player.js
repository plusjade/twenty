import React                from 'react'
import PropTypes            from 'prop-types'

import AceEditor            from 'components/AceEditor'
import NewRecording         from 'components/NewRecording'
import PlayerControls       from 'components/PlayerControls'
import PlayerOverlayResolver from 'components/PlayerOverlayResolver'
import Result               from 'components/Result'

import Library              from 'containers/Library'
import StylesWrapper        from 'styles/Wrapper'

const Player = (props) => {
  // Only show overlay state on initial load lifecycle
  // i.e. before video is loaded/played for first time
  const showOverlay = props.loadState && !(props.timePosition > 0)

  return (
    <div id="app-wrapper">
      <div id="editor-result" style={StylesWrapper.editorResult}>
      {showOverlay && (
        <PlayerOverlayResolver
          loadState={props.loadState}
          play={props.play}
        />
      )}
        <div id="editor" style={StylesWrapper.editor} >
          <AceEditor editorRef={props.editorRef} />
        </div>
        <div id="result" style={StylesWrapper.result}>
        {props.resultRendererEnabled && (
          <Result
            endpoint={props.resultEndpoint}
            resultRendererRef={props.resultRendererRef}
          />
        )}
        </div>
      </div>

      <div id="controls" style={StylesWrapper.controls}>
      {props.isPlayable() && (
        <PlayerControls
          isPlaying={props.isPlaying}
          pause={props.pause}
          play={props.play}
          replay={props.replay}
          seekTo={props.seekTo}
          timeDuration={props.timeDuration}
          timePosition={props.timePosition}
        />
      )}
      </div>

      <div id="navbar" style={StylesWrapper.navbar}>
        <div style={{flex: 1}}/>
        <a
          href="#library"
          style={StylesWrapper.libraryLink}
          onClick={(e) => {
            e.preventDefault()
            props.toggleLibrary()
          }}
        >
          Library
        </a>
        <NewRecording
          onClick={() => {
            window.location = "/make"
          }}
        />
      </div>

      <Library
        onSelect={(video) => { props.loadVideo(video.token) }}
        isOpen={props.libraryIsOpen}
        videosDB={props.videosDB}
      />
    </div>
  )
}

Player.propTypes = {
  libraryIsOpen: PropTypes.bool,
  videosDB: PropTypes.object.isRequired,
  loadVideo: PropTypes.func.isRequired,
}

export default Player
