import React                from 'react'

import AceEditor            from './AceEditor'
import Library              from '../containers/Library'
import NewRecording         from './NewRecording'
import RecorderControls     from './RecorderControls'
import Result               from './Result'

import StylesWrapper        from '../styles/Wrapper'

const Recorder = (props) => {
  return (
    <div id="app-wrapper">

      <div id="editor-result" style={StylesWrapper.editorResult}>
        <div id="editor" style={StylesWrapper.editor} >
          <AceEditor editorRef={props.editorRef} />
        </div>
        <div id="result" style={StylesWrapper.result}>
          <Result />
        </div>
      </div>

      <div id="controls" style={StylesWrapper.controls}>
        <RecorderControls
          audioSource={props.audioSource}
          availableModes={props.availableModes}
          finish={props.finish}
          isPlaying={props.isPlaying}
          mode={props.mode}
          timePosition={props.timePosition}
          toggleRecord={props.toggleRecord}
          updateMode={props.updateMode}
        />
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
            props.newRecording()
          }}
        />
      </div>

      <Library
        isOpen={props.libraryIsOpen}
      />
    </div>
  )
}

export default Recorder
