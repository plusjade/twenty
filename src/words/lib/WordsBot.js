// all bots need to implement:
// runCommand
// runnCommands
// reset
const WordsBot = () => {
  const updateCallbackStack = []

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

  function addUpdateCallback(callback) {
    updateCallbackStack.push(callback)
  }

  return ({
    runCommand,
    runCommands,
    addUpdateCallback,
  })
}

export default WordsBot
