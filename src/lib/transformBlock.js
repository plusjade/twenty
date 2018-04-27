import words from 'words/lib/transformBlockWords'
import quiz from 'quiz/lib/transformQuizBlock'

const transformers = {
  words,
  quiz,
}

const transformBlock = ({block, substitutions}) => (
  transformers[block.type]
    ? transformers[block.type](block, substitutions)
    : block
)

export default transformBlock
