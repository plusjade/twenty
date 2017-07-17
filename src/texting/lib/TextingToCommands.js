const TextingToCommands = (texts) => {
  const MESSAGE_PAUSE_DURATION = 1500
  let time = 0
  return (
    texts.map((slide, i) => {
      const commands = []
      const insert = [time, "i", i, slide.type, slide.text]

      commands.push(insert)

      if (slide.type === "theirs") {
        time += 100
        commands.push(
          [time, "transition", i, slide.type, "loading"]
        )
        time += 900
        commands.push(
          [time, "transition", i, slide.type, "loaded"]
        )
      } else {
        time += 100
        commands.push(
          [time, "transition", i, slide.type, "loading"]
        )

        time += 200
        commands.push(
          [time, "transition", i, slide.type, "loaded"]
        )
      }

      time += MESSAGE_PAUSE_DURATION

      return commands
    })
    .reduce((memo, array) => memo.concat(array), [])
  )
}

export default TextingToCommands
