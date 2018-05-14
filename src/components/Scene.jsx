import { observer } from "mobx-react"
import Radium                   from 'radium'
import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'

import Layer                from 'components/Layer/Layer'

import BlockWords           from 'words/containers/BlockWords/BlockWords'
import QuizBlock            from 'quiz/containers/QuizBlock/QuizBlock'

const blocksMap = {
  quiz: QuizBlock,
  words: BlockWords,
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
    blocks: PropTypes.array.isRequired,
  }

  handleTap = () => {
    if (this.props.isEditing) { return }
    this.props.sceneTransition()
  }

  render() {
    return (
      <Layer
        onTap={this.handleTap}
        style={[
          {
            backgroundColor: this.props.scene.get('bg'),
            display: "block",
          },
          this.props.isActive && style.visible,
          !this.props.isActive && style.hidden,
        ]}
      >
        {this.props.blocks.map((block) => {
          const Block = blocksMap[block.get('type')]
          if (!Block) {
            throw new TypeError(`No supported block for type: '${block.get('type')}'`)
          }

          return (
            <Block
              key={block.get('id')}
              block={block}
              isEditing={this.props.isEditing}
              sceneTransition={this.props.sceneTransition}
              editBlock={this.props.editBlock}
              removeBlock={this.props.removeBlock}
              stageBlock={this.props.stageBlock}
            />
          )
        })}
      </Layer>
    )
  }
}

export default Radium(observer(Scene))
