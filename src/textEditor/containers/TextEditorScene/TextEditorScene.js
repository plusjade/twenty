import Radium               from 'radium'
import React, {Component}   from 'react'
import throttle             from 'lib/throttle'

import AceEditor            from 'textEditor/components/AceEditor'
import EditorBot            from 'textEditor/lib/EditorBot'
import Result               from 'textEditor/components/Result'
import ResultRenderer       from 'textEditor/lib/ResultRenderer'

import style                from './Style'

class TextEditorScene extends Component {
  constructor(props) {
    super(props)

    this.editorRef = this.editorRef.bind(this)
    this.getEditor = this.getEditor.bind(this)
    this.resultRendererRef = this.resultRendererRef.bind(this)
  }

  componentWillMount() {
    this.resultRenderer = ResultRenderer(this.props.mode)

    this.resultUpdateThrottled = throttle(
      () => this.resultRenderer.update(this.editor.getValue())
    )
  }

  componentDidMount() {
    this.editor = this.getEditor()

    this.props.mountBot("editor", EditorBot(this.editor))

    if (this.resultRendererNode && this.editor) {
      this.resultRenderer.mount(this.resultRendererNode)
      this.editor.session.doc.on("change", this.resultUpdateThrottled, true)
    }
  }

  editorRef(node) {
    this.editorNode = node
  }

  resultRendererRef(node) {
    this.resultRendererNode = node
  }

  getEditor() {
    if (this.editor) { return this.editor }
    if (!this.editorNode) { return }
    this.editor = window.editor = window.ace.edit(this.editorNode)
    this.editor.$blockScrolling = Infinity
    this.editor.setTheme("ace/theme/twilight")
    this.editor.getSession().setMode(`ace/mode/${this.props.mode}`)
    this.editor.getSession().setUseSoftTabs(true)

    return this.editor
  }

  // props.resultRendererEnabled
  render() {
    return (
      <div
        id="TextEditorScene-wrap"
        style={[
          style.wrap.default,
          this.props.isActive && style.wrap.active
        ]}
      >
        <div id="editor" style={style.editor} >
          <AceEditor editorRef={this.editorRef} />
        </div>

        <div id="result" style={style.result}>
        {true && (
          <Result
            endpoint={this.resultRenderer.endpoint}
            resultRendererRef={this.resultRendererRef}
          />
        )}
        </div>
      </div>
    )
  }
}

TextEditorScene.defaultProps = {
  mode: "html"
}

export default Radium(TextEditorScene)
