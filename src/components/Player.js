import React                from 'react'
import PropTypes            from 'prop-types'

import AceEditor            from 'textEditor/components/AceEditor'
import PlayerControls       from 'components/PlayerControls'
import PlayerOverlay        from 'components/PlayerOverlay'
import Phone                from 'texting/components/Phone'
import InitialOverlay       from 'components/InitialOverlay'
import Result               from 'textEditor/components/Result'
import SlideResolver        from 'slides/components/SlideResolver'

import Library              from 'containers/Library'
import StylesWrapper        from 'styles/Wrapper'

const Player = (props) => {
  // Only show overlay state on initial load lifecycle
  // i.e. before video is loaded/played for first time
  const showOverlay = props.loadState && !(props.timePosition > 0)

  return (
    <div id="app-wrapper">
      <div id="editor-result" style={StylesWrapper.editorResult}>

      {props.progression.type === "texting" && (
        <PlayerOverlay backgroundColor="#263238">
          <Phone
            messages={props.messages || []}
            typingStatus={props.typingStatus}
          />
        </PlayerOverlay>
      )}

      {props.progression.type === "slides" && (
        <SlideResolver
          slide={props.slide}
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

      {showOverlay && (
        <InitialOverlay
          loadState={props.loadState}
          play={props.play}
          active={true}
        />
      )}
      </div>

      <div id="controls" style={StylesWrapper.controls}>
        <PlayerControls
          isPlaying={props.isPlaying}
          isPlayable={props.isPlayable}
          pause={props.pause}
          play={props.play}
          replay={props.replay}
          seekTo={props.seekTo}
          timeDuration={props.timeDuration}
          timePosition={props.timePosition}
          toggleLibrary={props.toggleLibrary}
        />
      </div>

      <Library
        onSelect={(video) => { props.loadVideo(video.token) }}
        isOpen={props.libraryIsOpen}
        toggleLibrary={props.toggleLibrary}
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
