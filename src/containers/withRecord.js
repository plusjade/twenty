import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import AudioRecorder        from 'lib/AudioRecorder'
import TextRecorderAce      from 'lib/TextRecorderAce'
import TimeKeeper           from 'lib/TimeKeeper'
import VideosDB             from 'lib/VideosDB'

const Videos = VideosDB()

const withRecord = (WrappedComponent) => {
  class withRecord extends Component {
    constructor(props) {
      super(props)

      this.initialState = this.initialState.bind(this)
      this.resetState = this.resetState.bind(this)
      this.updateMode = this.updateMode.bind(this)
      this.getRecordingId = this.getRecordingId.bind(this)
      this.newRecording = this.newRecording.bind(this)
      this.editorRef = this.editorRef.bind(this)
      this.getEditor = this.getEditor.bind(this)
      this.toggleLibrary = this.toggleLibrary.bind(this)
      this.record = this.record.bind(this)
      this.pause = this.pause.bind(this)
      this.save = this.save.bind(this)
      this.payload = this.payload.bind(this)
      this.finish = this.finish.bind(this)
      this.toggleRecord = this.toggleRecord.bind(this)

      this.state = this.initialState()
    }

    initialState() {
      return ({
        videos: [],
        recordingId: undefined,
        libraryIsOpen: false,
        mode: "html",
        audioSource: undefined,
        timePosition: 0,
      })
    }

    resetState() {
      this.setState(this.initialState())
    }

    componentWillMount() {
      this.timeKeeper = TimeKeeper()
      this.audioRecorder = AudioRecorder()
      this.newRecording()
    }

    componentDidMount() {
      this.editor = this.getEditor()

      if (this.editor) {
        this.textRecorder = TextRecorderAce({
          editor: this.editor,
          getTimePosition: this.timeKeeper.getTimePosition,
        })
      }

      this.audioRecorder.bootstrap((bool) => {
        this.setState({audioRecorderLoaded: bool})
      })
    }

    updateMode(type) {
      this.setState({mode: type})
    }

    getRecordingId() {
      return this.state.recordingId
    }

    newRecording() {
      this.setState({
        recordingId: Videos.token()
      })
    }

    editorRef(node) {
      this.editorNode = node
    }

    getEditor() {
      if (this.editor) { return this.editor }
      if (!this.editorNode) { return }
      this.editor = window.editor = window.ace.edit(this.editorNode)
      this.editor.setTheme("ace/theme/twilight")
      this.editor.getSession().setMode("ace/mode/javascript")
      this.editor.getSession().setUseSoftTabs(true)

      return this.editor
    }

    toggleLibrary() {
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
    }

    record() {
      if (this.timeKeeper.isPlaying()) { return }

      this.editor.focus()
      this.textRecorder.record()
      this.audioRecorder.record()
      this.timeKeeper.start((newPosition) => {
        this.setState({timePosition: newPosition})
      })
    }

    pause(time) {
      this.audioRecorder.pause()
      this.timeKeeper.pause()
      this.textRecorder.pause()
      this.save()
    }

    save() {
      // TODO: smarter
      if (!this.textRecorder || !this.textRecorder.hasCommands()) { return }

      const payload = this.payload()
      Videos.save(this.getRecordingId(), payload)
    }

    payload() {
      return ({
        mode: this.state.mode,
        commands: this.textRecorder.commands,
      })
    }

    finish() {
      this.pause()
      this.audioRecorder.finish((blob, source) => {
        this.setState({audioSource: source})
        Videos.persist({
          videoId: this.getRecordingId(),
          blob: blob
        })
      })
    }

    toggleRecord() {
      if (this.timeKeeper.isPlaying()) {
        this.pause()
      }
      else {
        this.record()
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}

          isPlaying={this.timeKeeper.isPlaying}

          toggleRecord={this.toggleRecord}
          finish={this.finish}

          updateMode={this.updateMode}
          newRecording={this.newRecording}

          toggleLibrary={this.toggleLibrary}

          editorRef={this.editorRef}
        />
      )
    }
  }

  withRecord.propTypes = {
    availableModes: PropTypes.array,
  }

  withRecord.defaultProps = {
    availableModes: ["html", "sql", "javascript"]
  }

  return withRecord
}

export default withRecord
