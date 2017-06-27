import React                from 'react'
import Commands             from './lib/Commands'
import throttle             from './lib/throttle'
import VideosDB             from './lib/VideosDB'
import QueryParams          from './lib/QueryParams'

import withPlay             from './withPlay'

import AceEditor            from './components/AceEditor'
import NewRecording         from './components/NewRecording'
import PlayerControls       from './components/PlayerControls'
import Result               from './components/Result'
import VideosList           from './components/VideosList'
import StylesWrapper        from './styles/Wrapper'

const Controls = withPlay(PlayerControls)
const Video = VideosDB()
const QParams = QueryParams()

const AppPlay = React.createClass({
  initialState() {
    return ({
      commands: [],
      videoId: QParams.get("id"),
      videos: Video.list(),
      mode: "html",
      libraryIsOpen: false,
    })
  },

  getInitialState() {
    return (this.initialState())
  },

  getDefaultProps() {
    return ({
      resultDomain: "http://twenty-result.s3-website-us-west-2.amazonaws.com"
    })
  },

  componentWillMount() {
    this.resultThrottled = throttle(this.result, 100)
    if (this.state.videoId) {
      const video = Video.find(this.state.videoId)
      if (video) {
        this.setState({mode: video.mode})
        this.loadCommands(video.commands)
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
      this.setState({videoId: videoId, libraryIsOpen: false})
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
      "workersDir": `${this.props.resultDomain}/workers/`,
      "externalsDir": `${this.props.resultDomain}/external/`,
      "imagesDir": `${this.props.resultDomain}/images/`,
      "soundsDir": `${this.props.resultDomain}/sounds/`,
      "jshintFile": `${this.props.resultDomain}/external/jshint/jshint.js`,
      "outputType": "",
      "enableLoopProtect": true
    })
  },

  resultEndpoint() {
    switch (this.state.mode) {
      case "javascript": {
        return `${this.props.resultDomain}/output.html`
        break
      }
      case "html": {
        return `${this.props.resultDomain}/output_webpage.html`
        break
      }
      case "sql": {
        return `${this.props.resultDomain}/output_sql.html`
        break
      }
    }
  },

  result() {
    if (this.resultNode) {
      const data = JSON.stringify(this.resultData())
      this
        .resultNode
        .contentWindow
        .postMessage(data, this.resultEndpoint())
    }
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
            <Result
              endpoint={this.resultEndpoint()}
              resultRef={this.resultRef}
            />
          </div>
        </div>

        <div id="controls" style={StylesWrapper.controls}>
        {this.isPlayable() && (
          <Controls
            videoId={this.state.videoId}
            getEditor={this.getEditor}
            chunksUpTo={this.state.chunksUpTo}
            nextChunk={this.state.nextChunk}
            timeDuration={this.state.timeDuration}
          />
        )}
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
              window.location = "/make"
            }}
          />
        </div>

        <div id="library" style={StylesWrapper.library}>
        {this.state.videos && (
          <VideosList
            list={this.state.videos}
            onSelect={this.loadVideo}
            isOpen={this.state.libraryIsOpen}
          />
        )}
        </div>

      </div>
    )
  }
})

export default AppPlay
