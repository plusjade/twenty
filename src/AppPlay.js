import React                from 'react'
import Commands             from './lib/Commands'
import throttle             from './lib/throttle'
import VideosDB             from './lib/VideosDB'
import QueryParams          from './lib/QueryParams'

import withPlay             from './withPlay'

import AceEditor            from './components/AceEditor'
import NewRecording         from './components/NewRecording'
import Player               from './components/Player'
import Result               from './components/Result'
import VideosList           from './components/VideosList'

const PlayerView = withPlay(Player)
const Video = VideosDB()
const QParams = QueryParams()

const AppPlay = React.createClass({
  initialState() {
    return ({
      commands: [],
      videoId: QParams.get("id"),
      videos: Video.list(),
      mode: "javascript",
    })
  },

  getInitialState() {
    return (this.initialState())
  },

  componentWillMount() {
    this.resultThrottled = throttle(this.result, 100)
    if (this.state.videoId) {
      const commands = Video.find(this.state.videoId)
      if (commands) {
        this.loadCommands(commands)
      }
    }
  },

  isPlayable() {
    return this.state.commands && this.state.commands.length > 0
  },

  loadCommands(commands) {
    const state = Object.assign({commands: commands}, Commands(commands))
    this.setState(state)
  },

  loadVideo(videoId) {
    const commands = Video.find(videoId)
    if (commands) {
      window.history.replaceState({}, null, `/?id=${videoId}`)
      this.loadCommands(commands)
      this.setState({videoId: videoId})
    }
  },

  refreshVideos() {
    this.setState({videos: Video.list()})
  },

  editorRef(node) {
    this.editorNode = node
  },

  resultRef(node) {
    this.resultNode = node
  },

  getEditor() {
    if (this.editor) { return this.editor }
    if (!this.editorNode) { return }
    this.editor = window.editor = window.ace.edit(this.editorNode)
    this.editor.setTheme("ace/theme/twilight")
    this.editor.getSession().setMode(`ace/mode/${this.state.mode}`)
    this.editor.getSession().setUseSoftTabs(true)
    this.editor.session.doc.on("change", this.resultThrottled, true)

    return this.editor
  },

  resultData() {
    const code = this.getEditor().getValue()
    return ({
      "code": code,
      "cursor": {
        "start": 0,
        "end": 0
      },
      "validate": "",
      "noLint": false,
      "version": 4,
      "settings": {},
      "workersDir": "http://localhost:8000/build/workers/",
      "externalsDir": "http://localhost:8000/build/external/",
      "imagesDir": "http://localhost:8000/build/images/",
      "soundsDir": "../../sounds/",
      "jshintFile": "http://localhost:8000/build/external/jshint/jshint.js",
      "outputType": "",
      "enableLoopProtect": true
    })
  },

  resultEndpoint() {
    switch (this.state.mode) {
      case "javascript": {
        return "http://localhost:8000/demos/simple/output.html"
        break
      }
      case "html": {
        return "http://localhost:8000/demos/simple/output_webpage.html"
        break
      }
      case "sql": {
        return "http://localhost:8000/demos/simple/output_sql.html"
        break
      }
    }
  },

  result() {
    console.log("result")
    if (this.resultNode) {
      const data = JSON.stringify(this.resultData())
      this
        .resultNode
        .contentWindow
        .postMessage(data, this.resultEndpoint())
    }
  },

  render() {
    return (
      <div>
        <div
          id="wrapper"
          style={{
            height: "500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            id="editor"
            style={{
              flex: 4,
              height: "inherit",
              border: "3px solid #444",
              position: "relative",
              verticalAlign: "top",
              boxSizing: "border-box",
            }}
          >
            <AceEditor editorRef={this.editorRef} />
          </div>
          <div
            id="result"
            style={{
              flex: 4,
              height: "inherit",
              border: "3px solid #444",
              borderLeft: 0,
              verticalAlign: "top",
              boxSizing: "border-box",
            }}
          >
            <Result
              endpoint={this.resultEndpoint()}
              resultRef={this.resultRef}
            />
          </div>
          <div
            id="list"
            style={{
              flex: 2,
              height: "inherit",
              overflow: "auto",
              verticalAlign: "top",
              boxSizing: "border-box",
              textAlign: "right",
              color: "#BDBDBD",
            }}
          >
            <NewRecording
              onClick={() => {
                window.location = "/make"
              }}
            />
          {this.state.videos && (
            <VideosList
              list={this.state.videos}
              onSelect={this.loadVideo}
            />
          )}
          </div>
        </div>

        <div
          id="controls"
          style={{
            display: "flex",
            justifyContent: "center",
            height: "60px",
            zIndex: 2,
          }}
        >
        {this.isPlayable() && (
          <div style={{flex: 8}}>
            <PlayerView
              videoId={this.state.videoId}
              getEditor={this.getEditor}
              chunksUpTo={this.state.chunksUpTo}
              nextChunk={this.state.nextChunk}
              timeDuration={this.state.timeDuration}
            />
          </div>
        )}
          <div style={{flex: 2}} />
        </div>
      </div>
    )
  }
})

export default AppPlay
