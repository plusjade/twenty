import Radium                   from 'radium'
import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'

import Layer                from 'components/Layer/Layer'

import WordsThing           from 'words/containers/WordsThing/WordsThing'
import TextingScene         from 'texting/containers/TextingScene'
import TextEditorScene      from 'textEditor/containers/TextEditorScene/TextEditorScene'
import QuizThing            from 'quiz/containers/QuizThing/QuizThing'


const style = {
  wrap: {
    position: "fixed",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  }
}

const thingsMap = {
  quiz: QuizThing,
  words: WordsThing,
  texting: TextingScene,
  editor: TextingScene
}

class Scene extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    scene: PropTypes.object.isRequired,
    things: PropTypes.object.isRequired,

    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Layer
        style={[
          {
            backgroundColor: this.props.scene.bg,
            flexDirection: "column",
          },
          this.props.isActive && style.visible,
          !this.props.isActive && style.hidden,
        ]}
      >
        <h1>{this.props.scene.id}</h1>
        {this.props.things.map(thing => {
          const Thing = thingsMap[thing.type]
          if (!Thing) { return }

          return (
            <Thing
              key={thing.id}
              thing={thing}

              pause={this.props.pause}
              play={this.props.play}
              isPlaying={this.props.isPlaying}
            />
          )
        })}
      </Layer>
    )
  }
}

export default Radium(Scene)
