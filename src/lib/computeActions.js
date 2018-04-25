import CommandPlayer        from 'lib/CommandPlayer'
import TextingToCommands    from 'texting/lib/TextingToCommands'
import WordsToCommands      from 'words/lib/WordsToCommands'
import Personalizer         from 'lib/Personalizer'

export const computeBlocks = ({rawBlocks, substitutions, seedOffset}) => {
  const personalizer = Personalizer(substitutions)
  let previousOffset = seedOffset || 0
  let previousDuration = 0

  const blocks = rawBlocks.map((block, index) => {
    switch(block.type) {
      case "words": {
        const personalizedData = (
          block.data.map(entry => ({
            ...entry,
            content: personalizer.personalize(entry.content)
          }))
        )
        const rawCommands = WordsToCommands(personalizedData, block.in)
        block.initialPayload = personalizedData
        block.player = CommandPlayer({
          initialPayload: personalizedData,
          rawCommands,
          blockId: block.id,
        })
        block.timeDuration = block.player.timeDuration() //+ (block.out || 0) // this is bad

        break
      }
      case "quiz": {
        const payload = {
          question: personalizer.personalize(block.data.question),
          answers: (
            block.data.answers.map(answer => (
              Object.assign(answer, {name: personalizer.personalize(answer.name)})
            ))
          )
        }
        block.initialPayload = payload
        block.player = CommandPlayer({
          initialPayload: payload,
          rawCommands: [],
          blockId: block.id,
        })
        block.timeDuration = block.player.timeDuration() // the time it takes for "after select" animation
        break
      }
      case "editor": {
        block.player = CommandPlayer({
          rawCommands: block.data,
          blockId: block.id,
        })
        block.timeDuration = block.player.timeDuration()
        break
      }
      case "texting": {
        const rawCommands = TextingToCommands(block.data)
        block.player = CommandPlayer({
          rawCommands,
          blockId: block.id,
        })
        block.timeDuration = block.player.timeDuration()
        break
      }
      default: {
        // noop
      }
    }

    block.timeOffset = previousOffset + previousDuration

    previousDuration = block.timeDuration
    previousOffset = block.timeOffset

    return block
  })

  return blocks
}

