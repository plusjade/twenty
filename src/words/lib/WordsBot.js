const WordsBot = (updateCallback, emitPayloadCallback) => {
  function runCommand(command) {
    // eslint-disable-next-line
    const [time, entryIndex, progress] = command

    updateCallback(entryIndex, progress)
  }

  function reset() {
    // noop
  }

  function runCommands(commands) {
    // eslint-disable-next-line
    const [time, entryIndex, progress] = commands.slice(-1)[0]

    updateCallback(entryIndex, progress)
  }

  function emitPayload({sceneIndex, initialPayload}) {
    if (typeof emitPayloadCallback !== "function") { return }

    emitPayloadCallback({sceneIndex, initialPayload})
  }

  return ({
    emitPayload: emitPayload,
    runCommand: runCommand,
    runCommands: runCommands
  })
}

export default WordsBot
