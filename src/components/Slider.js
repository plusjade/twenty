import React from 'react'

const Slider = (props) => {
  let offsetIndex = 0
  window.isOn = false
  function poll(boundingBox, x) {
    const offsetX = boundingBox.left
    const position = x - offsetX
    const percent = parseFloat(position/boundingBox.width)
    const index = parseInt(props.commands.length*percent, 10)

    if (index >= 0 && index != offsetIndex) {
      console.log(index)
      offsetIndex = index
      props.seekTo(index)
    }
  }

  let animationFrame = undefined

  return (
    <div
      style={{height: "100%", width: "100%", display: "none"}}
      onMouseDown={(e) => {
        console.log(window.isOn)
        window.isOn = true
        console.log(window.isOn)
        e.persist()
        animationFrame = window.requestAnimationFrame(() => {
          poll(e.target.getBoundingClientRect(), e.clientX)
        })
      }}
      onMouseMove={(e) => {
        console.log(window.isOn)

          requestAnimationFrame(poll)
          e.persist()
          animationFrame = window.requestAnimationFrame(() => {
            poll(e.target.getBoundingClientRect(), e.clientX)
          })
      }}
      onMouseUp={(e) => {
        //isOn = false
        console.log(animationFrame)
        window.cancelAnimationFrame(animationFrame)
      }}
      onMouseOut={(e) => {
        console.log(animationFrame)
        window.cancelAnimationFrame(animationFrame)
      }}
    />
  )
}

export default Slider

