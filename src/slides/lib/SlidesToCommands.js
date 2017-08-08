// time, slideIndex, progress
// [25823, 2, 0.5]
const SlidesToCommands = (slides, timeOffsetIn) => {
  const CHARACTER_DURATION = 55
  let time = timeOffsetIn || 0
  let currentSlideIndex = 0

  return (
    slides.map((slide, slideIndex) => {
      const characters = Array.from(slide.data)
      const totalCharacters = characters.length
      const totalTime = totalCharacters * CHARACTER_DURATION

      time += slide.in || 0
      return (
        characters.map((character, index) => {
          const progress = ((index + 1) / totalCharacters).toFixed(2)

          if (currentSlideIndex === slideIndex) {
            time += CHARACTER_DURATION
          } else {
            time += (slide.out || 0)
          }

          currentSlideIndex = slideIndex

          return [time, slideIndex, progress]
        })
      )
    })
    .reduce((memo, array) => memo.concat(array), [])
  )
}

export default SlidesToCommands
