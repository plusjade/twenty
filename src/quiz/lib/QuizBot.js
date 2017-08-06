function QuizBot(updateCallback, emitPayloadCallback) {
  function runCommand(command) {
    // noop
  }

  function runCommands(commands) {
    // noop
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

export default QuizBot
