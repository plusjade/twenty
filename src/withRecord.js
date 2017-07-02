import React                from 'react'
import RecordRTC            from 'recordrtc'

import RecorderAce          from './lib/RecorderAce'
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

        chunkPosition: -1,
        timeStart: undefined,
        timePosition: 0,
        timePositionPaused: 0,
        audioSrc: undefined,
        audioIsStarted: false,
      })
    },

    getInitialState() {
      return (this.initialState())
    },

    componentWillMount() {
      this.newRecording()
      this.tickInterval = undefined
      this.refreshVideos()
    },

    componentDidMount() {
      this.editor = this.getEditor()
      if (this.editor) {
        this.textRecorder = RecorderAce({
          editor: this.editor,
          isPaused: this.isPaused,
          getTimePosition: this.getTimePosition,
        })
        this.textRecorder.listen()
      }
      this.bootstrapAudio()
    },

    componentWillUnmount() {
      console.log("unmounting")
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

    getTimeNow() {
      return (new Date()).getTime()
    },

    setTimeStart(time) {
      this.setState({timeStart: time || this.getTimeNow()})
    },

    getTimeStart() {
      return this.state.timeStart
    },

    getTimePosition() {
      return this.state.timePositionPaused + this.getTimeNow() - this.getTimeStart()
    },

    updateTimePosition(time) {
      this.setState({timePosition: time || this.getTimePosition()})
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
      if (this.recorder.recordingLength > 0) {
        this.audioResume()
      } else {
        this.audioStart()
      }
      this.editor.focus()
      this.setTimeStart()
      this.tickInterval = setInterval(() => {
        this.updateTimePosition()
      }, 50)

      console.log("pressed record")
    },

    pause(time) {
      this.audioPause()
      clearInterval(this.tickInterval)
      this.tickInterval = undefined
      this.setState({
        timeStart: undefined,
        timePositionPaused: time || this.getTimePosition()
      })
      if (this.isPaused && this.hasRecording) {
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

    isPaused() {
      return !this.tickInterval
    },

    togglePause() {
      if (this.isPaused()) {
        this.record()
      }
      else {
        this.pause()
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

          getTimePosition={this.getTimePosition}
          record={this.record}
          pause={this.pause}
          finish={this.finish}
          isPaused={this.isPaused()}
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
