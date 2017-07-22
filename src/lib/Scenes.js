import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import SlidesToCommands     from 'slides/lib/SlidesToCommands'

const Scenes = (set) => {
  const PAUSE_BETWEEN_PROGRESSIONS = 1000
  let time = 0
  const scenes = set.map((p, index) => {
    switch(p.type) {
      case "slides": {
        p.player = CommandPlayer()
        p.player.reset(SlidesToCommands(p.data))
        p.timeDuration = p.player.timeDuration()
        break
      }
      case "editor": {
        p.player = CommandPlayer()
        p.player.reset(p.data)
        p.timeDuration = p.player.timeDuration()
        break
      }
      case "texting": {
        p.player = CommandPlayer()
        p.player.reset(TextingToCommands(p.data))
        p.timeDuration = p.player.timeDuration()
        break
      }
      default: {

      }
    }

    p.index = index
    p.timeOffset = time + (index > 0 ? PAUSE_BETWEEN_PROGRESSIONS : 0)
    time += p.timeDuration

    return p
  })
  const scenesReversed = scenes.slice(0).reverse()

  console.log(scenes)

  function timeDuration() {
    return (
      scenesReversed[0].timeOffset + scenesReversed[0].timeDuration
    )
  }

  function mount(type, bot) {
    scenes.forEach((scene) => {
      if (scene.type === type) {
        scene.player.mount(bot)
      }
    })
  }

  function at(timePosition) {
    const scene = find(timePosition)
    if (scene) {
      return ({
        timeDuration: scene.timeDuration,
        type: scene.type,
        index: scene.index,
        timeOffset: scene.timeOffset,
        offsetTimePosition: timePosition - scene.timeOffset,
        player: scene.player,
      })
    }
  }

  function find(timePosition) {
    return (
      scenesReversed.find((p) => {
        return timePosition > p.timeOffset
      })
    )
  }

  function types() {
    return scenes.map(scene => scene.type)
  }

  return ({
    at: at,
    mount: mount,
    timeDuration: timeDuration,
    types: types,
  })
}


export default Scenes
