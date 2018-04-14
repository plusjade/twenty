// all bots need to implement:
// runCommand
// runnCommands
// reset
// emitPayload (i think this is like an initializer)
const WordsBot = () => {
  const updateCallbackStack = []
  const emitPayloadCallbackStack = []

  function runCommand(command) {
    // eslint-disable-next-line
    const [time, entryIndex, progress] = command

    updateCallbackStack.forEach((cb) => {
      cb(entryIndex, progress)
    })
  }

  function reset() {
    // noop
  }

  function runCommands(commands) {
    // eslint-disable-next-line
    const [time, entryIndex, progress] = commands.slice(-1)[0]

    updateCallbackStack.forEach((cb) => {
      cb(entryIndex, progress)
    })
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

export default WordsBot
