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
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  square: {
    position: 'relative',
    width: '100vw',
    height: '100vw',
    borderTop:'1px solid #FFF',
    borderBottom:'1px solid #FFF'
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


  getColor() {
    if (!this.props.scene.get('color_hsl')) {
      const legacyColor = this.props.scene.get('bg')
      if (legacyColor) { return legacyColor }
    }

    const colorHsl = +this.props.scene.get('color_hsl') || -100
    if (colorHsl < 1) { // handle grayscale as represented by -100 - 0
      return `hsl(0, 0%, ${(Math.abs(colorHsl))}%)`
    }

    return `hsl(${colorHsl}, 100%, 50%)`
  }

  getBoundary = () => {
    return this.boundaryNode
  }

  getBoundaryRef = (node) => {
    if (node) {
      this.boundaryNode = node
    }
  }

  render() {
    return (
      <Layer
        onTap={this.handleTap}
        style={[
          {
            backgroundColor: this.getColor(),
            display: "flex",
          },
          this.props.isActive && style.visible,
          !this.props.isActive && style.hidden,
        ]}
      >
        <div style={style.square} ref={this.getBoundaryRef}>
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
                getBoundary={this.getBoundary}
              />
            )
          })}
        </div>
      </Layer>
    )
  }
}

export default Radium(observer(Scene))
