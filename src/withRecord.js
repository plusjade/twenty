import React                from 'react'

import AudioRecorder        from './lib/AudioRecorder'
import RecorderAce          from './lib/RecorderAce'
import TimeKeeper           from './lib/TimeKeeper'
import VideosDB             from './lib/VideosDB'

const Videos = VideosDB()

const withRecord = (Component) => {
  const withRecord = React.createClass({
    propTypes: {
    },

    getDefaultProps() {
      return ({
        availableModes: ["html", "sql", "javascript"]
      })
    },

    initialState() {
      return ({
        videos: [],
        recordingId: undefined,
        libraryIsOpen: false,
        mode: "html",
        audioSource: undefined,
        timePosition: 0,
      })
    },

    getInitialState() {
      return (this.initialState())
    },

    resetState() {
      this.setState(this.initialState())
    },

    componentWillMount() {
      this.timeKeeper = TimeKeeper()
      this.audioRecorder = AudioRecorder()
      this.newRecording()
    },

    componentDidMount() {
      this.editor = this.getEditor()

      if (this.editor) {
        this.textRecorder = RecorderAce({
          editor: this.editor,
          isPlaying: this.timeKeeper.isPlaying,
          getTimePosition: this.timeKeeper.getTimePosition,
        })
        this.textRecorder.listen()
      }

      this.audioRecorder.bootstrap((bool) => {
        this.setState({audioRecorderLoaded: bool})
      })
    },

    updateMode(type) {
      this.setState({mode: type})
    },

    getRecordingId() {
      return this.state.recordingId
    },

    newRecording() {
      this.setState({
        recordingId: Videos.token()
      })
    },

    loadVideo(video) {
      window.location = `/?id=${video.token}`
    },

    refreshVideos() {
      Videos.list().then((rsp) => {
        this.setState({videos: rsp.data})
      })
    },

    deleteVideo(videoId) {
      Videos.remove(videoId)
      this.refreshVideos()
    },

    editorRef(node) {
      this.editorNode = node
    },

    getEditor() {
      if (this.editor) { return this.editor }
      if (!this.editorNode) { return }
      this.editor = window.editor = window.ace.edit(this.editorNode)
      this.editor.setTheme("ace/theme/twilight")
      this.editor.getSession().setMode("ace/mode/javascript")
      this.editor.getSession().setUseSoftTabs(true)

      return this.editor
    },

    toggleLibrary() {
      if (!this.state.libraryIsOpen) {
        this.refreshVideos()
      }
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
    },

    record() {
      if (this.timeKeeper.isPlaying()) { return }

      this.editor.focus()
      this.audioRecorder.record()
      this.timeKeeper.start((newPosition) => {
        this.setState({timePosition: newPosition})
      })
    },

    pause(time) {
      this.audioRecorder.pause()
      this.timeKeeper.pause()
      this.save()
    },

    save() {
      // TODO: smarter
      if (!this.textRecorder || !this.textRecorder.hasCommands()) { return }

      const payload = this.payload()
      Videos.save(this.getRecordingId(), payload)
    },

    payload() {
      return ({
        mode: this.state.mode,
        commands: this.textRecorder.commands,
      })
    },

    finish() {
      this.pause()
      this.audioRecorder.finish((blob, source) => {
        this.setState({audioSource: source})
        Videos.persist({
          videoId: this.getRecordingId(),
          blob: blob
        })
      })
    },

    toggleRecord() {
      if (this.timeKeeper.isPlaying()) {
        this.pause()
      }
      else {
        this.record()
      }
    },

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}

          isPlaying={this.timeKeeper.isPlaying}

          toggleRecord={this.toggleRecord}
          finish={this.finish}

          updateMode={this.updateMode}
          newRecording={this.newRecording}

          loadVideo={this.loadVideo}
          deleteVideo={this.deleteVideo}
          toggleLibrary={this.toggleLibrary}

          editorRef={this.editorRef}
        />
      )
    }
  })

  return withRecord
}

export default withRecord
