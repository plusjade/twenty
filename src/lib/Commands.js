const Commands = (commands) => {
  const dict = buildDictionary(commands)
  const chunkTimes = getChunkTimes(dict)
  const timeDuration = getTimeDuration(commands)

  function buildDictionary(commands) {
    return (
      commands.reduce((memo, c) => {
        const time = c[0]
        if (memo[time]) {
          memo[time].push(c)
        } else {
          memo[time] = [c]
        }
        return memo
      }, {})
    )
  }

  function getChunkTimes(dict) {
    return Object.keys(dict).sort((a,b) => a - b)
  }

  function getTimeDuration(commands) {
    if (commands.length > 0) {
      return commands[commands.length - 1][0]
    } else {
      return 0
    }
  }

  function clampChunkTime(time) {
    let tracker = null
    chunkTimes.forEach((chunkTime, i) => {
      if (chunkTime <= time) {
        tracker = i
      }
    })

    return chunkTimes[tracker]
  }

  function chunkTimesUpToChunkTime(chunkTime) {
    return chunkTimes.slice(0, (chunkTimes.indexOf(chunkTime) + 1))
  }

  function findChunkTimesUpToTime(time) {
    const chunkTime = clampChunkTime(time)
    if (chunkTime) {
      return chunkTimesUpToChunkTime(chunkTime)
    } else {
      return []
    }
  }

  function nextChunkTime(time, position) {
    return chunkTimes.find((b, i) => i > position && b <= time)
  }

  // Get the next chunk available at <time>
  // Use to iteratively play through chunks one by one
  function nextChunk(time, position) {
    const chunkTime = nextChunkTime(time, position)
    if (chunkTime) {
      return ({
        chunk: dict[chunkTime],
        chunkPosition: position + 1
      })
    } else {
      return ({
        chunk: null,
        chunkPosition: null
      })
    }
  }

  // Get all chunks available up to and including <time>
  // Use to seekTo at particular <time>,
  // essentially replays every command to rebuild the state at <time>
  // Returns the chunkPosition for convenience
  function chunksUpTo(time, callback) {
    const chunkTimes = findChunkTimesUpToTime(time)
    chunkTimes.forEach((chunkTime) => {
      if (typeof callback === "function") {
        callback(dict[chunkTime])
      }
    })

    return chunkTimes.length - 1
  }

  return ({
    chunksUpTo: chunksUpTo,
    nextChunk: nextChunk,
    timeDuration: timeDuration,
  })
}

export default Commands
