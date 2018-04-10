import Radium                   from 'radium'
import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'

import Layer                from 'components/Layer/Layer'

import WordsScene           from 'words/containers/WordsScene/WordsScene'
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

const sceneTypesMap = {
  quiz: QuizScene,
  words: WordsScene,
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

  componentWillReceiveProps(nextProps) {
    // if (this.props.scene && this.props.scene)
    // console.log(nextProps.scene)
  }

  getSceneComponent() {
    const Component = sceneTypesMap[this.props.scene.type]
    if (!Component) { return }

    return (
      React.createElement(Component, {
        sceneIndex: this.props.scene.index,
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
      <Layer style={{backgroundColor: this.props.scene.bg}}>
        {this.getSceneComponent()}
      </Layer>
    )
  }
}

export default Radium(Scene)
