import CommandPlayer from 'lib/CommandPlayer'

const transformEditorBlock = (block) => {
  const player = CommandPlayer({
    rawCommands: block.data,
    blockId: block.id,
  })

  return ({
    ...block,
    player,
    timeDuration: player.timeDuration(),
  })
}

export default transformEditorBlock
