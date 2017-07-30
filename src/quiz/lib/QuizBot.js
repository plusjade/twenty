function QuizBot(updateCallback) {
  function runCommand(command) {
    updateCallback(command[1])
  }

  function runCommands(commands) {
    updateCallback(commands[0][1]) // there's only one
  }

  return ({
    runCommand: runCommand,
    runCommands: runCommands
  })
}

export default QuizBot
