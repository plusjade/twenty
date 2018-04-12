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
    activeThings: PropTypes.array.isRequired,
    mountBot: PropTypes.func.isRequired,
    sceneTypes: PropTypes.array.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isPlayable: PropTypes.bool.isRequired,
    replay: PropTypes.func.isRequired,
    seekTo: PropTypes.func.isRequired,
    timeDuration: PropTypes.number.isRequired,
    timePosition: PropTypes.number,
    thingsInScene: PropTypes.number.isRequired,
  }

  render() {
    return (
      <Layer
        style={{
          backgroundColor: this.props.scene.bg,
          flexDirection: "column",
        }}
      >
        {Array(this.props.thingsInScene).fill(0).map((_, i) => {
          const thing = this.props.activeThings[i]
          let component

          if (thing && thingsMap[thing.type]) {
            component = (
              React.createElement(thingsMap[thing.type], {
                sceneIndex: this.props.scene.jadeIndex,
                scene: thing,
                player: thing.player,
                isActive: true,
                pause: this.props.pause,
                play: this.props.play,
                isPlaying: this.props.isPlaying,
              })
            )
          } else {
            component = <span/>
          }

          return (
            <div style={{minHeight: 200}} key={i}>
              {component}
            </div>
          )
        })}
      </Layer>
    )
  }
}

export default Radium(Scene)
