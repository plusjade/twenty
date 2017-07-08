import Autobot              from 'lib/Autobot'
import Commands             from 'lib/Commands'

const TextPlayer = () => {
  const EVENTS_WHITELIST = ["end"]
  let autobot = undefined
  let callbacks = {}
  let commands = undefined
  let currentChunkPosition = undefined

  reset()

  function mount(editor) {
    autobot = Autobot(editor)
  }

  function on(event, callback) {
    if (EVENTS_WHITELIST.includes(event)) {
      callbacks[event] = callback
    } else {
      throw new TypeError(
        `event name must be in the set ['${EVENTS_WHITELIST.join("', '")}']`
      )
    }
  }

  function play(newPosition) {
    const {chunk, chunkPosition} = nextChunk(newPosition, getChunkPosition())

    if (chunk) {
      chunk.forEach((c) => autobot.runCommand(c))
      setChunkPosition(chunkPosition)
    }

    if (newPosition >= timeDuration() && callbacks.end) {
      callbacks.end()
    }
  }

  function reset(rawCommands) {
    currentChunkPosition = -1
    commands = Commands(rawCommands || [])
  }

  function seekTo(time) {
    setChunkPosition(
      chunksUpTo(time, (chunk) => {
        chunk.forEach(c => autobot.runCommand(c))
      })
    )
  }

  function timeDuration() {
    return commands.timeDuration
  }

  function getChunkPosition() {
    return currentChunkPosition
  }

  function setChunkPosition(index) {
    return currentChunkPosition = index
  }

  function chunksUpTo(time, callback) {
    return commands.chunksUpTo(time, callback)
  }

  function nextChunk(time, position) {
    return commands.nextChunk(time, position)
  }

  return ({
    mount: mount,
    on: on,
    play: play,
    reset: reset,
    seekTo: seekTo,
    timeDuration: timeDuration,
  })
}

export default TextPlayer
