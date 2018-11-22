import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'gsap/Draggable'
import Hammer from 'react-hammerjs'
import {
  getColor,
  getTextContent,
  getFontSize,
  getTextAlign,
  getTransforms,
  getRotationTransforms,
  syncTransforms,
} from 'lib/transforms'
import style from './style'

class BlockText extends Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    videoPlayer: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    reaction(
      () => props.block.get('lifecycle'),
      (lifecycle) => {
        if (lifecycle === 'edit') {
          // this.draggable && this.draggable.enable()
        } else {
          // this.draggable && this.draggable.disable()
        }
      }
    )
  }

  componentDidMount() {
    if (this.props.canEdit) {
      setTimeout(() => {
        this.makeDraggable()
      }, 1000)
    }
  }

  getRef = (node) => {
    this.node = node
  }

  resetState = () => {
    this.setState(BlockText.initialState())
  }

  makeDraggable = () => {
    if (this.draggable) { return }
    this.draggable = Draggable.create(this.node, {
      type: 'y',
      bounds: this.props.getBoundary(),
      onDragEnd: this.onDragEnd,
      onDragEndParams: [this.syncTransforms],
    })[0]
  }

  onDragEnd(syncTransforms) {
    syncTransforms({
      positionX: this.endX,
      positionY: this.endY,
    })
  }

  syncTransforms = (params) => {
    const {height, width} = this.props.videoPlayer.dimensions
    syncTransforms({
      block: this.props.block,
      params,
      height,
      width,
    })
  }

  getTransforms() {
    const {height, width} = this.props.videoPlayer.dimensions

    return getTransforms({block: this.props.block, width, height})
  }

  handleTap = () => {
    if (this.props.canEdit) {
      this.props.videoPlayer.stageBlock(this.props.block.get('id'))

      // this.makeDraggable()
    } else {
      this.props.videoPlayer.sceneTransition()
    }
  }

  render() {
    const content = getTextContent(this.props.block)
    const transforms = this.getTransforms()

    return (
      <div
        id={`block_${this.props.block.get('id')}`}
        ref={this.getRef}
        style={[
          style.default,
          {
            color: getColor(this.props.block),
            // fontSize: getFontSize(this.props.block),
            textAlign: getTextAlign(this.props.block),
          },
          this.props.block.get('lifecycle') === 'edit' && style.isStaged,
          (transforms.length > 0
            ? {transform: transforms.join(' ')}
            : style.isSmartCentered
          ),
        ]}
      >
        <Hammer onTap={this.handleTap}>
          <div
            style={[
              style.textWrap,
              style.isActive,
            ]}
          >
            {content.map((string, i) => (
              <p key={i}>
                {string}
              </p>
            ))}
          </div>
        </Hammer>
      </div>
    )
  }
}

export default observer(Radium(BlockText))
