import CommandPlayer from 'lib/CommandPlayer'
import TextingToCommands from 'texting/lib/TextingToCommands'

const transformTextingBlock = (block) => {
  const rawCommands = TextingToCommands(block.data)
  const player = CommandPlayer({
    rawCommands,
  })

  return ({
    ...block,
    player,
    timeDuration: player.timeDuration(),
  })
}

export default transformTextingBlock
