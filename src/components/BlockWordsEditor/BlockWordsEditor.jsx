import { observer } from "mobx-react"
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import EditorButton from 'components/EditorButton/EditorButton'
import EnterText from 'components/EnterText/EnterText'
import Slider from 'components/Slider/Slider'

import style from './style'

class BlockWordsEditor extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    stagedBlockId: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    getStagedBlock: PropTypes.func.isRequired,
  }

  onEnterText = (value) => {
    if (value) {
      this.props.editBlock(this.props.stagedBlockId, {content: value})
    } else {
      this.props.removeBlock(this.props.stagedBlockId)
    }
  }

  getStagedText = () => {
    const block = this.props.getStagedBlock()

    if (!block) { return '' }

    return (
      block.get('content') || (block.get('data') && block.get('data').content)
    )
  }

  onChangeText = (value) => {
    if (value) {
      this.props.video.editBlock(this.props.stagedBlockId, {content: value})
    }
  }

  getStagedRotation = () => {
    const block = this.props.getStagedBlock()
    if (!block) { return 0 }
    const rotation = block.get('rotation') || 0
    if (!rotation) { return 0 }

    return rotation.replace('deg', '')
  }

  onChangeRotation = (value) => {
    const block = this.props.getStagedBlock()
    if (!block) { return }
    block.set('rotation', `${+value}deg`)
  }

  getStagedColor = () => {
    const defaultColor = -100
    const block = this.props.getStagedBlock()
    if (!block) { return defaultColor }
    const color = block.get('color_hsl') || defaultColor
    if (!color) { return defaultColor }

    return color
  }

  onChangeColor = (value) => {
    const block = this.props.getStagedBlock()
    if (!block) { return }
    block.set('color_hsl', value)
  }

  getStagedScale = () => {
    const defaultScale = 1
    const block = this.props.getStagedBlock()
    if (!block) { return defaultScale }
    const scale = block.get('scale') || defaultScale
    if (!scale) { return defaultScale }

    return scale
  }

  onChangeScale = (value) => {
    const block = this.props.getStagedBlock()
    if (!block) { return }
    block.set('scale', value)
  }

  render() {
    return (
      <div
        style={[
          style.wrap,
          this.props.isActive && style.isActive,
        ]}
      >
        <EnterText
          value={this.getStagedText()}
          onSubmit={this.onEnterText}
          onChange={this.onChangeText}
          isActive
        />

        <div style={[style.toolWrap, {marginTop: 10}]}>
          <div style={style.toolLabelWrap}>
            <div style={style.toolLabel}>
              color
            </div>
          </div>
          <div style={style.toolSliderWrap}>
            <Slider
              min={-100}
              max={360}
              value={this.getStagedColor()}
              onChange={this.onChangeColor}
              dataType={'color'}
            />
          </div>
        </div>

        <div style={style.toolWrap}>
          <div style={style.toolLabelWrap}>
            <div style={style.toolLabel}>
              size
            </div>
          </div>
          <div style={style.toolSliderWrap}>
            <Slider
              min={0.1}
              max={5}
              step={0.1}
              value={this.getStagedScale()}
              onChange={this.onChangeScale}
            />
          </div>
        </div>

        <div style={style.toolWrap}>
          <div style={style.toolLabelWrap}>
            <div style={style.toolLabel}>
              rotate
            </div>
          </div>
          <div style={style.toolSliderWrap}>
            <Slider
              min={-180}
              max={180}
              value={this.getStagedRotation()}
              onChange={this.onChangeRotation}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(observer(BlockWordsEditor))
