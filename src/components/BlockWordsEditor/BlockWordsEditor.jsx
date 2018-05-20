import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import EditorButton from 'components/EditorButton/EditorButton'
import Slider from 'components/Slider/Slider'

import style from './style'

class BlockWordsEditor extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    stagedBlockId: PropTypes.string,
    video: PropTypes.object.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    getStagedBlock: PropTypes.func.isRequired,
  }

  state = {
    whatsOpen: null
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

  getStagedSize = () => {
    const defaultValue = 24
    const block = this.props.getStagedBlock()
    if (!block) { return defaultValue }
    const value = block.get('size') || defaultValue
    if (!value) { return defaultValue }

    return value
  }

  onChangeSize = (value) => {
    const block = this.props.getStagedBlock()
    if (!block) { return }
    block.set('size', value)
  }

  onTapSize = () => {
    this.setState({whatsOpen: 'size', isVisible: false}, this.setVisible)
  }

  onTapRotate = () => {
    this.setState({whatsOpen: 'rotate', isVisible: false}, this.setVisible)
  }

  setVisible = () => {
    setTimeout(() => {
      this.setState({isVisible: true})
    }, 100)
  }

  render() {
    return (
      <div
        style={[
          style.wrap,
          this.props.isActive && style.isActive,
        ]}
      >
        <div style={style.barWrap}>
          <div style={style.toolWrap}>
            <EditorButton onTap={this.props.toggleEditText}>
              <div>{"✍️"}</div>
            </EditorButton>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(Radium(BlockWordsEditor))
