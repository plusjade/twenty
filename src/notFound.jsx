import React from 'react'
import ReactDOM from 'react-dom'
import Player from 'components/Player/Player'
import withPlay from 'containers/withPlay'
import Video from 'lib/Video'
import randomEmoji from 'db/randomEmoji'
import blogPost from 'db/pain'

const notFound = () => {
  const props = {}
  const video = new Video()

  blogPost.forEach((entry) => {
    const sceneId = video.addScene()
    const scene = video.getScene(sceneId)
    scene.set('color_hsl', -95)
    video.addBlock({
      ...entry,
      sceneId,
      color_hsl: -10,
    })
  })
  // video.addBlock({
  //   type: "words",
  //   content: "Sorry that video wasn't found",
  //   color: "#FFF",
  //   align: "center",
  //   xRel: '0.1',
  //   yRel: '0.6',
  //   sceneId: sceneId,
  // })
  // video.addBlock({
  //   type: "words",
  //   content: `${randomEmoji(3)}`,
  //   color: "#FFF",
  //   xRel: '0.4',
  //   yRel: '0.5',
  //   sceneId: sceneId,
  // })

  ReactDOM.render(
    React.createElement(
      withPlay(Player),
      {...props, video}
    ),
    document.getElementById('root')
  )
}

export default notFound
