import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import AudioRecorder        from 'lib/AudioRecorder'
import TextRecorderAce      from 'textEditor/lib/TextRecorderAce'
import TimeKeeper           from 'lib/TimeKeeper'

import throttle             from 'lib/throttle'
import ResultRenderer       from 'textEditor/lib/ResultRenderer'

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
      this.finish = this.finish.bind(this)
      this.toggleRecord = this.toggleRecord.bind(this)

      this.resultRendererRef = this.resultRendererRef.bind(this)

      this.state = this.initialState()
    }

    initialState() {
      return ({
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
      this.timeKeeper = new TimeKeeper()
      this.audioRecorder = AudioRecorder()
      this.newRecording()

      this.resultRenderer = ResultRenderer(this.state.mode)
      this.resultUpdateThrottled = throttle(
        () => this.resultRenderer.update(this.editor.getValue())
      )
    }

    componentDidMount() {
      this.editor = this.getEditor()

      if (this.editor) {
        this.textRecorder = TextRecorderAce({
          editor: this.editor,
          getTimePosition: this.timeKeeper.getTimePosition,
        })
      }

      this.audioRecorder.mount((bool) => {
        this.setState({audioRecorderLoaded: bool})
      })

      if (this.resultRendererNode && this.editor) {
        this.resultRenderer.mount(this.resultRendererNode)
        this.editor.session.doc.on("change", this.resultUpdateThrottled, true)
      }
    }

    updateMode(type) {
      this.setState({mode: type})
    }

    getRecordingId() {
      return this.state.recordingId
    }

    newRecording() {
      this.setState({
        recordingId: this.props.videosDB.token()
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

      this.props.videosDB.save(this.getRecordingId(), {
        mode: this.state.mode,
        commands: this.textRecorder.commands,
      })
    }

    finish() {
      this.pause()
      this.audioRecorder.finish((blob, source) => {
        this.setState({audioSource: source})
        this.props.videosDB.persist({
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

    resultRendererRef(node) {
      this.resultRendererNode = node
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

          resultEndpoint={this.resultRenderer.endpoint}
          resultRendererRef={this.resultRendererRef}
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
