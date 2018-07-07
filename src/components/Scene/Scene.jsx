import { observer } from "mobx-react"
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BlockWords from 'blocks/BlockWords/BlockWords'
import BlockText from 'blocks/BlockText/BlockText'
import { getColor } from 'lib/transforms'

import style from './style'

const blocksMap = {
  words: BlockWords,
  text: BlockText,
}

class Scene extends Component {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    isHorizontal: PropTypes.bool,
    isFixed: PropTypes.bool,
    isEditing: PropTypes.bool,
    isActive: PropTypes.bool.isRequired,
    scene: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    stageBlock: PropTypes.func.isRequired,
    sceneTransition: PropTypes.func.isRequired,
  }

  state = {
    isLandscape: false
  }

  // TODO
  componentDidMount() {
    this.setLandscape()
    window.addEventListener('resize', this.setLandscape)
  }

  setLandscape = () => {
    const clientRect = document.body.getBoundingClientRect()
    if (clientRect.width > clientRect.height) {
      this.setState({isLandscape: true})
    }
  }

  handleTap = () => {
    if (this.props.canEdit) { return }
    this.props.sceneTransition()
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
      <div
        id={this.props.scene.get('id')}
        style={[
          style.wrap,
          {
            backgroundColor: getColor(this.props.scene),
          },
          this.props.isHorizontal && style.isHorizontal,
          this.props.isFixed && style.isFixed,
          (this.props.isActive
            ? style.isActive
            : style.isHidden),
          (this.props.canEdit
            ? style.isEditing
            : style.isPresenting),
        ]}
      >
        <div
          style={[
            style.boundingSquare,
            this.state.isLandscape && style.boundingLandscape,
          ]}
          ref={this.getBoundaryRef}
        >
          {this.props.blocks.map((block) => {
            const Block = blocksMap[block.get('type')]
            if (!Block) {
              const message = `No supported block for type: '${block.get('type')}'`
              throw new TypeError(message)
            }

            return (
              <Block
                key={block.get('id')}
                block={block}
                canEdit={this.props.canEdit}
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
      </div>
    )
  }
}

export default observer(Radium(Scene))
