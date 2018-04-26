import TimeKeeper from 'lib/TimeKeeper'

const EVENTS_WHITELIST = [
  'start',
  'play',
  'pause',
  'end',
  'tick',
]

class BlockPlayer {
  hasStarted = false
  timeKeeper = new TimeKeeper()
  callbacks = {}

  constructor({offset} = {}) {
    this.offset = offset
  }

  timeDuration = () => (this.offset || 0 ) + 1000 // HACK

  play = (newPosition) => {
    if (!this.hasStarted) {
      this.hasStarted = true
      if (this.callbacks.start) {
        this.callbacks.start.forEach((cb) => {
          cb()
        })
      }

      this.timeKeeper.start((nextTimePosition) => {
        if (this.offset && nextTimePosition < this.offset) { return }

        // console.log(nextTimePosition)
        if (nextTimePosition >= this.timeDuration()) {
          console.log("TIMER DONE")
          this.timeKeeper.pause()
          if (this.callbacks.end) {
            this.callbacks.end.forEach((cb) => {
              cb()
            })
          }
        } else if (this.callbacks.tick) {
          this.callbacks.tick.forEach((cb) => {
            cb(nextTimePosition)
          })
        }
      })
    }
  }

  pause = () => {
    this.timeKeeper.pause()
    if (this.callbacks.pause) {
      this.callbacks.pause.forEach((cb) => {
        cb()
      })
    }
  }

  on = (event, callback) => {
    if (EVENTS_WHITELIST.includes(event)) {
      if (this.callbacks[event]) {
        this.callbacks[event].push(callback)
      } else {
        this.callbacks[event] = [callback]
      }
    } else {
      throw new TypeError(
        `event name must be in the set ['${EVENTS_WHITELIST.join("', '")}']`
      )
    }
  }
}

export default BlockPlayer
