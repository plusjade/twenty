import words from 'words/lib/transformWordsBlock'
import quiz from 'quiz/lib/transformQuizBlock'

const transformers = {
  words,
  quiz,
}

const transformBlocks = ({blocks, substitutions}) => (
  blocks.map(block => (
    transformers[block.type]
      ? transformers[block.type](block, substitutions)
      : block
  ))
)

export default transformBlocks
