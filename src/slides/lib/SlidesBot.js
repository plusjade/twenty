const SlidesBot = (updateCallback) => {
  let text = ""
  let currentSlideIndex = 0

  function runCommand(command) {
    // eslint-disable-next-line
    const [time, c, slideIndex, data] = command
    if (currentSlideIndex === slideIndex) {
      text += data
    } else {
      text = data
    }
    updateCallback(text, currentSlideIndex)
    currentSlideIndex = slideIndex
  }

  function reset() {
    text = ""
    currentSlideIndex = 0
  }

  function runCommands(commands) {
    reset()

    commands.forEach((command) => {
      // eslint-disable-next-line
      const [time, c, slideIndex, data] = command
      if (currentSlideIndex === slideIndex) {
        text += data
      } else {
        text = data
      }
      currentSlideIndex = slideIndex
    })

    updateCallback(text, currentSlideIndex)
  }


  return ({
    runCommand: runCommand,
    runCommands: runCommands
  })
}

export default SlidesBot
