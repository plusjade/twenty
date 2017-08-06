// time, slideIndex, progress
// [25823, 2, 0.5]
const SlidesToCommands = (slides) => {
  const SLIDE_PAUSE_DURATION = 1500
  const CHARACTER_DURATION = 55
  let time = 0
  let currentSlideIndex = 0

  return (
    slides.map((slide, slideIndex) => {
      if (slide.type === "title") {
        const characters = Array.from(slide.data)
        const totalCharacters = characters.length
        const totalTime = totalCharacters * CHARACTER_DURATION

        return (
          characters.map((character, index) => {
            const progress = ((index + 1) / totalCharacters).toFixed(2)

            if (currentSlideIndex === slideIndex) {
              time += CHARACTER_DURATION
            } else {
              time += SLIDE_PAUSE_DURATION
            }

            currentSlideIndex = slideIndex

            return [time, slideIndex, progress]
          })
        )
      } else {
        currentSlideIndex = slideIndex
        return []
      }
    })
    .reduce((memo, array) => memo.concat(array), [])
  )
}

export default SlidesToCommands
