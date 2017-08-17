const WordsPlayer = (words) => {
  const SLIDE_PAUSE_DURATION = 1000
  let textInterval = undefined

  function start(callback) {
    const promises = words.map((slide, i) => {
      return (
        function () {
          return (
            new Promise(function(resolve, reject) {
              if (slide.type === "title") {
                resolve(iterateText(slide.data, callback))
              } else {
                resolve({})
              }
            })
          )
        }
      )
    })

    promiseChain(promises)
  }

  // Execute a list of Promise return functions in series
  function promiseChain(list) {
    return list.reduce(function(memo, fn) {
      return memo = memo.then(fn)
    }, Promise.resolve())
  }

  function iterateText(text, callback) {
    return (
      new Promise(function(resolve, reject) {
        const textArray = Array.from(text)
        let index = 0
        let output = ""

        textInterval = setInterval(() => {
          if (textArray[index]) {
            output += textArray[index]
            index += 1
            callback(output)
          } else {
            clearInterval(textInterval)
            setTimeout(resolve, SLIDE_PAUSE_DURATION)
          }
        }, 45)
      })
    )
  }

  return ({
    start: start
  })
}

export default WordsPlayer


