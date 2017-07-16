const ConvoBot = (updateCallback) => {
  let dict = {}
  let messages = []
  let currentIndex = 0

  function runCommand(command) {
    const [messages, typingStatus] = runCommandUnit(command)

    updateCallback(messages, typingStatus)
  }

  function runCommandUnit(command) {
    let typingStatus = "NOOP"
    const [time, c, index, type, text] = command

    if (c === "i") {
      currentIndex = index

      dict[index] = {text, type}

      messages = Object.keys(dict).map((_, i) => {
        if (currentIndex === i) {
          dict[i].status = "NOOP"
        } else {
          dict[i].status = "loaded"
        }
        return (dict[i])
      })
    } else if (c === "transition") {
      dict[index].status = text

      if (dict[index].type === "theirs") {
        typingStatus = text
      }

      messages = Object.keys(dict).map((_, i) => dict[i])
    }

    return ([messages, typingStatus])
  }

  function reset() {
    dict = {}
    messages = []
    currentIndex = 0
  }

  function runCommands(commands) {
    reset()
    let messages, typingStatus
    commands.forEach((command) => {
      [messages, typingStatus] = runCommandUnit(command)
    })

    updateCallback(messages, typingStatus)
  }

  return ({
    runCommand: runCommand,
    runCommands: runCommands
  })
}

export default ConvoBot
