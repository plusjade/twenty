import BlockPlayer from 'lib/BlockPlayer'
import personalize from 'lib/personalize'

const transformQuizBlock = (block, substitutions) => {
  const payload = {
    question: personalize(block.data.question, substitutions),
    answers: (
      block.data.answers.map(answer => (
        {...answer, name: personalize(answer.name, substitutions)}
      ))
    )
  }

  const player = new BlockPlayer()

  return ({
    ...block,
    player,
    timeDuration: player.timeDuration(),
    payload,
  })
}

export default transformQuizBlock
