import React                from 'react'

import Commands             from './lib/Commands'
import VideosDB             from './lib/VideosDB'
import QueryParams          from './lib/QueryParams'

import withRecord           from './withRecord'

import AceEditor            from './components/AceEditor'
import NewRecording         from './components/NewRecording'
import Result               from './components/Result'
import RecorderControls     from './components/RecorderControls'
import VideosList           from './components/VideosList'

import StylesWrapper        from './styles/Wrapper'

const Controls = withRecord(RecorderControls)
const Videos = VideosDB()
const QParams = QueryParams()

const App = React.createClass({
  getInitialState() {
    return ({
      videoId: QParams.get("id"),
      commands: [],
      videos: Videos.list(),
      recordingId: undefined,
      libraryIsOpen: false,
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
    window.open(`/?id=${videoId}`, "_blank")
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

  toggleLibrary() {
    this.setState({libraryIsOpen: !this.state.libraryIsOpen})
  },

  render() {
    return (
      <div id="app-wrapper">

        <div id="editor-result" style={StylesWrapper.editorResult}>
          <div id="editor" style={StylesWrapper.editor} >
            <AceEditor editorRef={this.editorRef} />
          </div>
          <div id="result" style={StylesWrapper.result}>
            <Result/>
          </div>
        </div>

        <div id="controls" style={StylesWrapper.controls}>
          <Controls
            {...this.props}
            {...this.state}
            save={this.save}
            getEditor={this.getEditor}
          />
        </div>

        <div id="navbar" style={StylesWrapper.navbar}>
          <div style={{flex: 1}}/>
          <a
            href="#library"
            style={StylesWrapper.libraryLink}
            onClick={(e) => {
              e.preventDefault()
              this.toggleLibrary()
            }}
          >
            Library
          </a>
          <NewRecording
            onClick={() => {
              this.newRecording()
            }}
          />
        </div>

        <div id="library" style={StylesWrapper.library}>
        {this.state.videos && (
          <VideosList
            list={this.state.videos}
            onSelect={this.loadVideo}
            isOpen={this.state.libraryIsOpen}
            onDelete={this.deleteVideo}
          />
        )}
        </div>

      </div>
    )
  }
})

export default App
