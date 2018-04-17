import Commands from 'lib/Commands'
import TimeKeeper from 'lib/TimeKeeper'

const EVENTS_WHITELIST = [
  'runCommand',
  'runCommands',
  'start',
  'play',
  'end',
]

const CommandPlayer = ({initialPayload, rawCommands, blockId} = {}) => {
  let hasStarted = false
  const timeKeeper = TimeKeeper()
  const callbacks = {}
  const commands = Commands(rawCommands)
  let currentChunkPosition = -1

  const play = (newPosition) => {
    const {chunk, chunkPosition} = nextChunk(newPosition, getChunkPosition())

    if (!hasStarted) {
      hasStarted = true

      timeKeeper.start((nextTimePosition) => {
        if (nextTimePosition >= timeDuration()) {
          console.log('end', blockId)
          timeKeeper.pause()
          if (callbacks.end) {
            callbacks.end.forEach((cb) => {
              cb()
            })
          }
        }
      })

      if (callbacks.start) {
        console.log('start', blockId)
        callbacks.start.forEach((cb) => {
          cb({initialPayload})
        })
      }
    }

    if (chunk) {
      chunk.forEach((c) => {
        if (callbacks.runCommand) {
          callbacks.runCommand.forEach((cb) => {
            cb(c)
          })
        }
      })
      setChunkPosition(chunkPosition)
    }
  }

  // FIXME: Seeking is definitly broken
  const seekTo = (time) => {
    let commands = []
    const chunkPosition = chunksUpTo(time, (chunk) => {
      commands = commands.concat(chunk)
    })

    if (callbacks.play) {
      callbacks.play.forEach((cb) => {
        cb({initialPayload})
      })
    }


    if (callbacks.runCommands) {
      callbacks.runCommands.forEach((cb) => {
        cb(commands)
      })
    }


    setChunkPosition(chunkPosition)
  }

  const timeDuration = () => commands.timeDuration + 1000

  const nextChunk = (time, position) => commands.nextChunk(time, position)

  const getChunkPosition = () => currentChunkPosition

  const chunksUpTo = (time, callback) => commands.chunksUpTo(time, callback)

  const setChunkPosition = (index) => {
    currentChunkPosition = index
  }

  const on = (event, callback) => {
    if (EVENTS_WHITELIST.includes(event)) {
      if (callbacks[event]) {
        callbacks[event].push(callback)
      } else {
        callbacks[event] = [callback]
      }
    } else {
      throw new TypeError(
        `event name must be in the set ['${EVENTS_WHITELIST.join("', '")}']`
      )
    }
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
