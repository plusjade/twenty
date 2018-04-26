import Commands from 'lib/Commands'
import TimeKeeper from 'lib/TimeKeeper'

const EVENTS_WHITELIST = [
  'runCommand',
  'runCommands',
  'start',
  'play',
  'pause',
  'end',
]

const CommandPlayer = ({rawCommands} = {}) => {
  let hasStarted = false
  const timeKeeper = TimeKeeper()
  const callbacks = {}
  const commands = Commands(rawCommands)
  let currentChunkPosition = -1

  const play = (newPosition) => {
    if (!hasStarted) {
      hasStarted = true
      if (callbacks.start) {
        callbacks.start.forEach((cb) => {
          cb()
        })
      }

      timeKeeper.start((nextTimePosition) => {
        if (nextTimePosition >= timeDuration()) {
          console.log("TIMER DONE")
          timeKeeper.pause()
          if (callbacks.end) {
            callbacks.end.forEach((cb) => {
              cb()
            })
          }
        } else {
          const {chunk, chunkPosition} = nextChunk(nextTimePosition, getChunkPosition())
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
      })
    }
  }

  const pause = () => {
    timeKeeper.pause()
    if (callbacks.pause) {
      callbacks.pause.forEach((cb) => {
        cb()
      })
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
        cb()
      })
    }

    if (callbacks.runCommands) {
      callbacks.runCommands.forEach((cb) => {
        cb(commands)
      })
    }

    setChunkPosition(chunkPosition)
  }

  const timeDuration = () => commands.timeDuration < 1000 ? 1000 : commands.timeDuration // HACK

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
    pause,
    seekTo,
    timeDuration,
    rawCommands,
  })
}

export default CommandPlayer
