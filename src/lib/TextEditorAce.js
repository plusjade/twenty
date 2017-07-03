// this.editorNode, this.state.mode
const TextEditorAce = (mountNode, mode) => {
  let editor = undefined

  function getEditor() {
    if (editor) { return editor }
    if (!mountNode) { return }

    editor = window.editor = window.ace.edit(mountNode)
    editor.$blockScrolling = Infinity
    editor.setTheme("ace/theme/twilight")
    editor.getSession().setMode(`ace/mode/${mode}`)
    editor.getSession().setUseSoftTabs(true)


    return editor
  }

  function clear() {
    editor && editor.setValue("")
  }

  function getValue() {
    if (editor) {
      return editor.getValue()
    } else {
      return ""
    }
  }

  return ({
    getEditor: getEditor,
    clear: clear,
    getValue: getValue,
  })
}

export default TextEditorAce
