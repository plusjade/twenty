import Commands from 'lib/Commands'

const EVENTS_WHITELIST = ['end', 'update', 'emitPayload']

const CommandPlayer = ({
  thingId,
  initialPayload,
  autobot,
  rawCommands,
} = {}) => {
  const callbacks = {}
  const commands = Commands(rawCommands)
  let currentChunkPosition = -1

  const on = (event, callback) => {
    if (EVENTS_WHITELIST.includes(event)) {
      if (callbacks[event]) {
        callbacks[event].push(callback)
      } else {
        callbacks[event] = [callback]
      }

      switch(event) {
        case 'update': {
          autobot.addUpdateCallback(callback)
          break
        }
        case 'emitPayload': {
          break
        }
        default: {
          // noop
        }
      }
    } else {
      throw new TypeError(
        `event name must be in the set ['${EVENTS_WHITELIST.join("', '")}']`
      )
    }
  }

  const play = (newPosition) => {
    const {chunk, chunkPosition} = nextChunk(newPosition, getChunkPosition())

    if (callbacks.emitPayload) {
      callbacks.emitPayload.forEach((cb) => {
        cb({thingId, initialPayload})
      })
    }

    if (chunk) {
      chunk.forEach(c => autobot.runCommand(c))
      setChunkPosition(chunkPosition)
    }

    if (newPosition >= timeDuration() && callbacks.end) {
      callbacks.end()
    }
  }

  const seekTo = (time) => {
    let commands = []
    const chunkPosition = chunksUpTo(time, (chunk) => {
      commands = commands.concat(chunk)
    })

    if (callbacks.emitPayload) {
      callbacks.emitPayload.forEach((cb) => {
        cb({thingId, initialPayload})
      })
    }

    autobot.runCommands(commands)
    setChunkPosition(chunkPosition)
  }

  const timeDuration = () => commands.timeDuration

  const nextChunk = (time, position) => commands.nextChunk(time, position)

  const getChunkPosition = () => currentChunkPosition

  const chunksUpTo = (time, callback) => commands.chunksUpTo(time, callback)

  const setChunkPosition = (index) => {
    currentChunkPosition = index
  }

  return ({
    on,
    play,
    seekTo,
    timeDuration,
    rawCommands,
  })
}

export default CommandPlayer
