import Radium                   from 'radium'
import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'

import Layer                from 'components/Layer/Layer'

import WordsThing           from 'words/containers/WordsThing/WordsThing'
import TextingScene         from 'texting/containers/TextingScene'
import TextEditorScene      from 'textEditor/containers/TextEditorScene/TextEditorScene'
import QuizScene            from 'quiz/containers/QuizScene/QuizScene'


const style = {
  wrap: {
    position: "fixed",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
}

const thingsMap = {
  quiz: QuizScene,
  words: WordsThing,
  texting: TextingScene,
  editor: TextingScene
}

class Scene extends PureComponent {
  static propTypes = {
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    scene: PropTypes.object.isRequired,
    mountBot: PropTypes.func.isRequired,
    sceneTypes: PropTypes.array.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isPlayable: PropTypes.bool.isRequired,
    replay: PropTypes.func.isRequired,
    seekTo: PropTypes.func.isRequired,
    timeDuration: PropTypes.number.isRequired,
    timePosition: PropTypes.number,
  }

  getThings() {
    const Thing = thingsMap[this.props.scene.type]
    if (!Thing) { return }

    return (
      React.createElement(Thing, {
        sceneIndex: this.props.scene.index,
        scene: this.props.scene,
        mountBot: this.props.mountBot,
        isActive: true,
        pause: this.props.pause,
        play: this.props.play,
        isPlaying: this.props.isPlaying,
      })
    )
  }

  render() {
    return (
      <Layer
        style={{
          backgroundColor: this.props.scene.bg,
          flexDirection: "column",
        }}
      >
        {this.getThings()}
        {this.getThings()}
      </Layer>
    )
  }
}

export default Radium(Scene)
