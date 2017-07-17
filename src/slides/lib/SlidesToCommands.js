// time, command, slideIndex, data
// [25823,"i",2, "O"]
const SlidesToCommands = (slides) => {
  const SLIDE_PAUSE_DURATION = 1500
  const CHARACTER_DURATION = 55
  let time = 0
  let slideIndex = 0

  return (
    slides.map((slide, i) => {
      if (slide.type === "title") {
        return (
          Array.from(slide.data).map((character, index) => {
            if (slideIndex === i) {
              time += CHARACTER_DURATION
            } else {
              time += SLIDE_PAUSE_DURATION
            }
            slideIndex = i
            return [time, "i", i, character]
          })
        )
      } else {
        slideIndex = i
        return []
      }
    })
    .reduce((memo, array) => memo.concat(array), [])
  )
}

export default SlidesToCommands
