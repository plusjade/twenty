import React                from 'react'

import AceEditor            from './AceEditor'
import NewRecording         from './NewRecording'
import PlayerControls       from './PlayerControls'
import Result               from './Result'
import VideosList           from './VideosList'
import StylesWrapper        from '../styles/Wrapper'

const Player = (props) => {
  return (
    <div id="app-wrapper">
      <div id="editor-result" style={StylesWrapper.editorResult}>
        <div id="editor" style={StylesWrapper.editor} >
          <AceEditor editorRef={props.editorRef} />
        </div>
        <div id="result" style={StylesWrapper.result}>
          <Result
            endpoint={props.resultEndpoint()}
            resultRef={props.resultRef}
          />
        </div>
      </div>

      <div id="controls" style={StylesWrapper.controls}>
      {props.isPlayable() && (
        <PlayerControls
          isPaused={props.isPaused}
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

      <div id="library" style={StylesWrapper.library}>
      {props.videos && (
        <VideosList
          videos={props.videos}
          onSelect={(video) => { props.loadVideo(video.token) }}
          isOpen={props.libraryIsOpen}
        />
      )}
      </div>

    </div>
  )
}

export default Player
