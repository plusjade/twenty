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
const OBSERVER_THRESHOLDS = new Array(101).fill(1).map((_, i) => +(i * 0.01).toFixed(2))

class Scene extends Component {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    isHorizontal: PropTypes.bool,
    isFixed: PropTypes.bool,
    isEditing: PropTypes.bool,
    scene: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    stageBlock: PropTypes.func.isRequired,
    sceneTransition: PropTypes.func.isRequired,
  }

  state = {
    isLandscape: false,
  }

  // TODO
  componentDidMount() {
    const RATIO = this.props.canEdit ? 0.75 : 0.5
    this.setLandscape()
    window.addEventListener('resize', this.setLandscape)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio >= RATIO) {
              this.props.scene.set('isActive', true)
              this.props.activeSceneId.set(this.props.scene.get('id'))

            } else if (this.isActive()) {
              this.props.scene.delete('isActive')
            }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: OBSERVER_THRESHOLDS,
      }
    )
    observer.observe(this.sceneNode)
  }

  isActive = () => this.props.scene.get('isActive')

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

  getSceneRef = (node) => {
    if (node) {
      this.sceneNode = node
    }
  }

  render() {
    return (
      <div
        id={this.props.scene.get('id')}
        ref={this.getSceneRef}
        style={[
          style.wrap,
          {
            backgroundColor: getColor(this.props.scene),
          },
          this.props.isHorizontal && style.isHorizontal,
          this.props.isFixed && style.isFixed,
          (this.isActive()
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
