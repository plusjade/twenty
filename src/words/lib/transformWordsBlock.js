import BlockPlayer from 'lib/BlockPlayer'
import personalize from 'lib/personalize'

const transformWordsBlock = (block, substitutions) => {
  const data = ({
    ...block.data,
    content: personalize(block.data.content, substitutions)
  })

  const player = new BlockPlayer({offset: block.offset})

  return ({
    ...block,
    player,
    data,
    timeDuration: player.timeDuration(),
  })
}

export default transformWordsBlock
