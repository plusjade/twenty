const EditorBot = (editor) => {
  let handlers = {}

  function insert(startRow, startCol, endRow, endCol, data) {
    const delta = Object.assign({
                      action: "insert",
                      lines: data,
                    },
                    makeRange(startRow, startCol, endRow, endCol)
                  )

    editor.session.doc.applyDeltas([delta])
  }

  function remove(startRow, startCol, endRow, endCol, data) {
    const delta = Object.assign({
                      action: "remove"
                    }, makeRange(startRow, startCol, endRow, endCol)
                  )
    editor.session.doc.applyDeltas([delta])
  }

  function select(startRow, startCol, endRow, endCol) {
    if (endRow == null) {
      endRow = startRow
    }

    if (endCol == null) {
      endCol = startCol
    }

    editor.selection.setSelectionRange(
      makeRange(startRow, startCol, endRow, endCol)
    )
  }

  function makeRange(startRow, startCol, endRow, endCol) {
    return ({
      start: {
        row: startRow,
        column: startCol
      },
      end: {
        row: endRow,
        column: endCol
      }
    })
  }

  handlers = {select, insert, remove}

  // Commands are stored in the format:
  // [time, name, arguments...]
  function runCommand(event) {
    const handler = handlers[event[1]]

    if (handler) {
      handler.apply(handlers, event.slice(2))
    } else {
      console.error("Command not found:", event[1])
    }
  }

  function runCommands(commands) {
    editor.setValue("")
    commands.forEach(runCommand)
  }

  return({
    runCommand: runCommand,
    runCommands: runCommands,
  })
}

export default EditorBot
