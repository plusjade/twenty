import React                from 'react'
import RecordRTC            from 'recordrtc'

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
        audioSrc: undefined,
        timePosition: 0,
      })
    },

    getInitialState() {
      return (this.initialState())
    },

    componentWillMount() {
      this.timeKeeper = TimeKeeper()
      this.newRecording()
      this.refreshVideos()
    },

    componentDidMount() {
      // editor
      this.editor = this.getEditor()

      // editor recorder
      if (this.editor) {
        this.textRecorder = RecorderAce({
          editor: this.editor,
          isPlaying: this.timeKeeper.isPlaying,
          getTimePosition: this.timeKeeper.getTimePosition,
        })
        this.textRecorder.listen()
      }

      // audio recorder
      this.bootstrapAudio()
    },

    componentWillUnmount() {
      if (this.textRecorder) {
        this.textRecorder.unListen()
      }
    },

    resetState() {
      this.setState(this.initialState())
    },

    bootstrapAudio() {
      window.navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
        const StereoAudioRecorder = RecordRTC.StereoAudioRecorder
        this.recorder = window.recorder = new StereoAudioRecorder(stream, {})
        this.setState({audioSrc: URL.createObjectURL(stream)})
      }).catch((e) => {
        console.log(e)
        alert("Audio recorder failed to load =/")
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
      this.setState({libraryIsOpen: !this.state.libraryIsOpen})
    },


    audioStart() {
      console.log("record")
      this.recorder.record()
    },

    audioPause() {
      console.log("audio pause")
      this.recorder.pause()
    },

    audioResume() {
      console.log("resume")
      this.recorder.resume()
    },

    audioFinish() {
      console.log("finish")
      this.recorder.stop((blob) => {
        const src = URL.createObjectURL(blob)
        console.log(blob, src)
        this.setState({audioSrc: src})
        Videos.persist({
          videoId: this.getRecordingId(),
          blob: blob
        })
      })
    },

    record() {
      if (this.timeKeeper.isPlaying()) { return }
      // audio
      if (this.recorder.recordingLength > 0) {
        this.audioResume()
      } else {
        this.audioStart()
      }

      // editor
      this.editor.focus()

      this.timeKeeper.start((newPosition) => {
        this.setState({timePosition: newPosition})
      })

      console.log("pressed record")
    },

    pause(time) {
      // audio
      this.audioPause(time)

      this.timeKeeper.pause()

      if (this.hasRecording) {
        this.save()
      }
    },

    save() {
      const payload = this.payload()
      Videos.save(this.getRecordingId(), payload)
      this.refreshVideos()
    },

    payload() {
      return ({
        mode: this.state.mode,
        commands: this.textRecorder.commands,
      })
    },

    finish() {
      this.pause()
      this.audioFinish()
    },

    togglePause() {
      if (this.timeKeeper.isPlaying()) {
        this.pause()
      }
      else {
        this.record()
      }
    },

    hasRecording() {
      return this.textRecorder && this.textRecorder.hasCommands()
    },

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}

          isPlaying={this.timeKeeper.isPlaying}

          record={this.record}
          pause={this.pause}
          finish={this.finish}
          hasRecording={this.hasRecording()}

          save={this.save}
          getEditor={this.getEditor}
          updateMode={this.updateMode}
          newRecording={this.newRecording}
          togglePause={this.togglePause}

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
