import React                from 'react'

import AceEditor            from 'components/AceEditor'
import NewRecording         from 'components/NewRecording'
import PlayerControls       from 'components/PlayerControls'
import Result               from 'components/Result'

import Library              from 'containers/Library'
import StylesWrapper        from 'styles/Wrapper'


const Player = (props) => {
  return (
    <div id="app-wrapper">
      <div id="editor-result" style={StylesWrapper.editorResult}>
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
      />
    </div>
  )
}

export default Player
