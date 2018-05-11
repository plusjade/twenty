import React from 'react'
import ReactDOM from 'react-dom'
import Player from 'components/Player'
import withPlay from 'containers/withPlay'
import Video from 'lib/Video'
import randomEmoji from 'db/randomEmoji'

const notFound = () => {
  const props = {}
  const video = new Video()
  const sceneId = video.addScene()
  video.addBlock({
    type: "words",
    content: "Sorry that video wasn't found",
    color: "#FFF",
    position: [0, '-15vh'],
    sceneId: sceneId,
  })
  video.addBlock({
    type: "words",
    content: `${randomEmoji(3)}`,
    color: "#FFF",
    offset: 200,
    position: [0, '15vh'],
    sceneId: sceneId,
  })

  ReactDOM.render(
    React.createElement(
      withPlay(Player),
      {...props, video}
    ),
    document.getElementById('root')
  )
}

export default notFound
