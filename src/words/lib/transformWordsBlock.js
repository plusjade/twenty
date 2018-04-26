import BlockPlayer from 'lib/BlockPlayer'
import personalize from 'lib/personalize'

const transformWordsBlock = (block, substitutions) => {
  const payload = ({
    ...block.data,
    content: personalize(block.data.content, substitutions)
  })

  const player = new BlockPlayer()

  return ({
    ...block,
    player,
    payload,
    timeDuration: player.timeDuration(),
  })
}

export default transformWordsBlock
