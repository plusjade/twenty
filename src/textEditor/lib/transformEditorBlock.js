import CommandPlayer from 'lib/CommandPlayer'

const transformEditorBlock = (block) => {
  const player = CommandPlayer({
    rawCommands: block.data,
  })

  return ({
    ...block,
    player,
    timeDuration: player.timeDuration(),
  })
}

export default transformEditorBlock
