function QuizBot(updateCallback, emitPayloadCallback) {
  const updateCallbackStack = []
  const emitPayloadCallbackStack = []

  function runCommand(command) {
    // noop
  }

  function runCommands(commands) {
    // noop
  }

  function emitPayload({sceneIndex, initialPayload}) {
    emitPayloadCallbackStack.forEach((cb) => {
      cb({sceneIndex, initialPayload})
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
