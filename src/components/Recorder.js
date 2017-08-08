import React                from 'react'
import PropTypes            from 'prop-types'

import AceEditor            from 'textEditor/components/AceEditor'
import NewRecording         from 'components/NewRecording'
import RecorderControls     from 'components/RecorderControls'
import Result               from 'textEditor/components/Result'

import Library              from 'containers/Library/Library'

const style = {}

const Recorder = (props) => {
  return (
    <div id="app-wrapper">

      <div id="editor-result" style={style.sceneWrap}>
        <div id="editor" style={style.editor} >
          <AceEditor editorRef={props.editorRef} />
        </div>
        <div id="result" style={style.result}>
        {props.resultRendererEnabled && (
          <Result
            endpoint={props.resultEndpoint}
            resultRendererRef={props.resultRendererRef}
          />
        )}
        </div>
      </div>

      <div id="controls" style={style.controls}>
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

      <div id="navbar" style={style.navbar}>
        <div style={{flex: 1}}/>
        <a
          href="#library"
          style={style.libraryLink}
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
        videosDB={props.videosDB}
      />
    </div>
  )
}

Recorder.propTypes = {
  libraryIsOpen: PropTypes.bool,
  videosDB: PropTypes.object.isRequired,
}

export default Recorder
