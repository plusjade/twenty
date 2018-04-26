import BlockPlayer from 'lib/BlockPlayer'
import personalize from 'lib/personalize'

const transformQuizBlock = (block, substitutions) => {
  const data = {
    question: personalize(block.data.question, substitutions),
    answers: (
      block.data.answers.map(answer => (
        {...answer, name: personalize(answer.name, substitutions)}
      ))
    )
  }

  const player = new BlockPlayer({offset: block.offset})

  return ({
    ...block,
    data,
    player,
    timeDuration: player.timeDuration(),
  })
}

export default transformQuizBlock
