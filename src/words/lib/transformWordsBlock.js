import CommandPlayer from 'lib/CommandPlayer'
import WordsToCommands from 'words/lib/WordsToCommands'
import personalize from 'lib/personalize'

const transformWordsBlock = (block, substitutions) => {
  const personalizedData = (
    block.data.map(entry => ({
      ...entry,
      content: personalize(entry.content, substitutions)
    }))
  )
  const rawCommands = WordsToCommands(personalizedData, block.in)
  const player = CommandPlayer({
    initialPayload: personalizedData,
    rawCommands,
    blockId: block.id,
  })

  return ({
    ...block,
    player,
    timeDuration: player.timeDuration(),
    initialPayload: personalizedData,
  })
}

export default transformWordsBlock
