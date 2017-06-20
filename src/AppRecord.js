import React                from 'react'

import Commands             from './lib/Commands'
import VideosDB             from './lib/VideosDB'
import QueryParams          from './lib/QueryParams'

import withRecord           from './withRecord'

import AceEditor            from './components/AceEditor'
import NewRecording         from './components/NewRecording'
import Result               from './components/Result'
import Recorder             from './components/Recorder'
import VideosList           from './components/VideosList'

const RecorderView = withRecord(Recorder)
const Videos = VideosDB()
const QParams = QueryParams()

const App = React.createClass({
  getInitialState() {
    return ({
      videoId: QParams.get("id"),
      commands: [],
      videos: Videos.list(),
      recordingId: undefined
    })
  },

  componentWillMount() {
    this.newRecording()
  },

  getTimeNow() {
    return (new Date()).getTime()
  },

  getRecordingId() {
    return this.state.recordingId
  },

  getRecordingName() {
    return `vids_${this.getRecordingId()}`
  },

  hasCommands() {
    return window.commands && window.commands.length > 0
  },

  save() {
    if (!this.hasCommands()) { return }
    Videos.save(this.getRecordingName(), window.commands)
    this.refreshVideos()
  },

  clearCommands() {
    this.setState({commands: []})
  },

  newRecording() {
    this.clearCommands()
    this.setState({recordingId: this.getTimeNow()})
  },

  loadVideo(videoId) {
    window.open(`/play?id=${videoId}`, "_blank")
    return
    const commands = Videos.find(videoId)
    if (commands) {
      this.setState({commands: commands, videoId: videoId})
    }
  },

  refreshVideos() {
    this.setState({videos: Videos.list()})
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

  render() {
    return (
      <div>
        <div style={{
            width: "100%",
            height: "500px",
          }}
        >
          <div style={{
              width: "40%",
              height: "inherit",
              border: "3px solid #444",
              position: "relative",
              display: "inline-block",
              verticalAlign: "top",
              boxSizing: "border-box",
            }}
          >
            <AceEditor editorRef={this.editorRef} />
          </div><div style={{
              height: "inherit",
              width: "40%",
              border: "3px solid #444",
              borderLeft: 0,
              display: "inline-block",
              verticalAlign: "top",
              boxSizing: "border-box",
            }}
          >
            <Result />
          </div><div style={{
              height: "400px",
              width: "20%",
              display: "inline-block",
              verticalAlign: "top",
              boxSizing: "border-box",
              textAlign: "right",
              color: "#BDBDBD",
            }}
          >
            <NewRecording
              onClick={() => {
                this.newRecording()
              }}
            />
          {this.state.videos && (
            <VideosList
              list={this.state.videos}
              onSelect={this.loadVideo}
              onDelete={this.deleteVideo}
            />
          )}
          </div>
        </div>

        <div style={{
            width: "80%",
            height: "60px",
            zIndex: 2,
            backgroundColor: "#222",
          }}
        >
          <RecorderView
            {...this.props}
            {...this.state}
            save={this.save}
            getEditor={this.getEditor}
          />
        </div>
      </div>
    )
  }
})

export default App
