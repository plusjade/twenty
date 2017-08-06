const SlidesBot = (updateCallback, emitPayloadCallback) => {
  function runCommand(command) {
    // eslint-disable-next-line
    const [time, slideIndex, progress] = command

    updateCallback(slideIndex, progress)
  }

  function reset() {
    // noop
  }

  function runCommands(commands) {
    // eslint-disable-next-line
    const [time, slideIndex, progress] = commands.slice(-1)[0]

    updateCallback(slideIndex, progress)
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

export default SlidesBot
