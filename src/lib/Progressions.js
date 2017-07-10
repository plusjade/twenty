import CommandPlayer        from 'lib/CommandPlayer'
import SlidesToCommands     from 'lib/SlidesToCommands'

const Progressions = ({set, editorBot, slidesBot}) => {
  const PAUSE_BETWEEN_PROGRESSIONS = 1000
  let time = 0
  const progressions = set.map((p, index) => {
    p.player = CommandPlayer()

    if (p.type === "slides") {
      p.player.mount(slidesBot())
      p.player.reset(SlidesToCommands(p.data))
    } else if (p.type === "editor") {
      p.player.mount(editorBot())
      p.player.reset(p.data)
    }

    p.timeDuration = p.player.timeDuration()
    p.index = index
    p.timeOffset = time + (index > 0 ? PAUSE_BETWEEN_PROGRESSIONS : 0)
    time += p.timeDuration

    return p
  })
  const progressionsReversed = progressions.slice(0).reverse()

  console.log(progressions)

  function timeDuration() {
    return (
      progressionsReversed[0].timeOffset + progressionsReversed[0].timeDuration
    )
  }

  function at(timePosition) {
    const progression = find(timePosition)
    if (progression) {
      return ({
        timeDuration: progression.timeDuration,
        type: progression.type,
        index: progression.index,
        timeOffset: progression.timeOffset,
        offsetTimePosition: timePosition - progression.timeOffset,
        player: progression.player,
      })
    }
  }

  function find(timePosition) {
    return (
      progressionsReversed.find((p) => {
        return timePosition > p.timeOffset
      })
    )
  }

  return ({
    at: at,
    timeDuration: timeDuration,
  })
}


export default Progressions
