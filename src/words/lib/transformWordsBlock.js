import CommandPlayer from 'lib/CommandPlayer'
import WordsToCommands from 'words/lib/WordsToCommands'
import personalize from 'lib/personalize'

const transformWordsBlock = (block, substitutions) => {
  const payload = (
    block.data.map(entry => ({
      ...entry,
      content: personalize(entry.content, substitutions)
    }))
  )
  const rawCommands = WordsToCommands(payload, block.in)
  const player = CommandPlayer({
    rawCommands,
  })

  return ({
    ...block,
    player,
    payload,
    timeDuration: player.timeDuration(),
  })
}

export default transformWordsBlock
