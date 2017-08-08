// time, entryIndex, progress
// [25823, 2, 0.5]
const WordsToCommands = (words, timeOffsetIn) => {
  const CHARACTER_DURATION = 55
  let time = timeOffsetIn || 0
  let currentSlideIndex = 0

  return (
    words.map((entry, entryIndex) => {
      const characters = Array.from(entry.data)
      const totalCharacters = characters.length
      const totalTime = totalCharacters * CHARACTER_DURATION

      time += entry.in || 0
      return (
        characters.map((character, index) => {
          const progress = ((index + 1) / totalCharacters).toFixed(2)

          if (currentSlideIndex === entryIndex) {
            time += CHARACTER_DURATION
          } else {
            time += (entry.out || 0)
          }

          currentSlideIndex = entryIndex

          return [time, entryIndex, progress]
        })
      )
    })
    .reduce((memo, array) => memo.concat(array), [])
  )
}

export default WordsToCommands
