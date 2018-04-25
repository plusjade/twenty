import CommandPlayer from 'lib/CommandPlayer'
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
  const player = CommandPlayer({
    initialPayload: payload,
    rawCommands: [],
    blockId: block.id,
  })

  return ({
    ...block,
    player,
    timeDuration: player.timeDuration(),
    initialPayload: payload,
  })
}

export default transformQuizBlock
