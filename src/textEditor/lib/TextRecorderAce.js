const TextRecorderAce = ({editor, getTimePosition}) => {
  let isListening = false
  let isRecording = false
  let commands = []
  let synchronizedTime = undefined

  function record() {
    if (!isListening) { listen() }
    isRecording = true
  }

  function pause() {
    isRecording = false
  }

  function listen() {
    editor
      .session
      .doc
      .on("change", listenChange, true)
    editor
      .selection
      .addEventListener("changeCursor", listenChangeCursor, true)
    editor
      .selection
      .addEventListener("changeSelection", listenSelect, true)
  }

  function unMount() {
    editor
      .session
      .doc
      .off("change", listenChange)
    editor
      .selection
      .removeEventListener("changeCursor", listenChangeCursor)
    editor
      .selection
      .removeEventListener("changeSelection", listenSelect)
  }

  function listenChange(e) {
    const start = e.start
    const end = e.end

    if (e.action.indexOf("insert") === 0) {
      const insert = e.lines || e.text
      log(
        e.action,
        start.row,
        start.column,
        end.row,
        end.column,
        insert
      )
    } else {
      log(
        e.action,
        start.row,
        start.column,
        end.row,
        end.column
      )
    }
  }

  function listenChangeCursor() {
    if (editor.selection.isEmpty()) {
      listenSelect()
    }
  }

  function listenSelect() {
    const curRange = editor.selection.getRange()
    const start = curRange.start
    const end = curRange.end
    log(
      "select",
      start.row,
      start.column,
      end.row,
      end.column
    )
  }

  // Commands are stored in the format:
  // [time, name, arguments...]
  function log() {
    let args
    if (!isRecording) { return }

    if (synchronizedTime === undefined) {
      synchronizedTime = Math.floor(getTimePosition())
      setTimeout(() => {
          synchronizedTime = undefined
      }, 50)
    }

    args = Array.prototype.slice.call(arguments, 0)
    args.unshift(synchronizedTime)
    commands.push(args)
    return true
  }

  function hasCommands() {
    return commands.length > 0
  }

  return ({
    record: record,
    pause: pause,
    unMount: unMount,
    commands: commands,
    hasCommands: hasCommands,
  })
}

export default TextRecorderAce
