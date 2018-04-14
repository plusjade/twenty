function QuizBot(updateCallback, emitPayloadCallback) {
  const updateCallbackStack = []
  const emitPayloadCallbackStack = []

  function runCommand(command) {
    // noop
  }

  function runCommands(commands) {
    // noop
  }

  function emitPayload({thingId, initialPayload}) {
    emitPayloadCallbackStack.forEach((cb) => {
      cb({thingId, initialPayload})
    })
  }

  function addUpdateCallback(callback) {
    updateCallbackStack.push(callback)
  }

  function addEmitPayloadCallback(callback) {
    emitPayloadCallbackStack.push(callback)
  }

  return ({
    emitPayload,
    runCommand,
    runCommands,
    addUpdateCallback,
    addEmitPayloadCallback,
  })
}

export default QuizBot
