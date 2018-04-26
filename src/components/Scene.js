import Radium                   from 'radium'
import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'

import Layer                from 'components/Layer/Layer'

import WordsBlock           from 'words/containers/WordsBlock/WordsBlock'
import TextingScene         from 'texting/containers/TextingScene'
import TextEditorScene      from 'textEditor/containers/TextEditorScene/TextEditorScene'
import QuizBlock            from 'quiz/containers/QuizBlock/QuizBlock'

const blocksMap = {
  quiz: QuizBlock,
  words: WordsBlock,
  texting: TextingScene,
  editor: TextingScene
}

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

class Scene extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    scene: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,

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

            alignItems: 'stretch',
            flexFlow: 'column nowrap',
          },
          this.props.isActive && style.visible,
          !this.props.isActive && style.hidden,
        ]}
      >
        {this.props.blocks.map(block => {
          const Block = blocksMap[block.type]
          if (!Block) { return }

          return (
            <Block
              key={block.id}
              block={block}

              pause={this.props.pause}
              play={this.props.play}
              isPlaying={this.props.isPlaying}

              nextScene={this.props.nextScene}
            />
          )
        })}
      </Layer>
    )
  }
}

export default Radium(Scene)
