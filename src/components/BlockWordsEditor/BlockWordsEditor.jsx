import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import EditorButton from 'components/EditorButton/EditorButton'
import Overlay from 'components/Overlay/Overlay'
import AddBlockButton from 'components/AddBlockButton/AddBlockButton'
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

  onTapColor = () => {
    this.props.toggleBottomPanel()
  }

  onTap = () => {
    // this.props.unStageBlock
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        onTap={this.onTap}
      >
        <div
          style={[
            style.wrap,
            style.isActive,
          ]}
        >
          <AddBlockButton onTap={this.props.toggleEditText}>
            <div>
              <span role="img" aria-label="edit">✍️</span>
              <span> Edit Content</span>
            </div>
          </AddBlockButton>

          <AddBlockButton onTap={this.onTapColor}>
            <div>
              <span role="img" aria-label="color">🎨</span>
              <span> Edit Color</span>
            </div>
          </AddBlockButton>
        </div>
      </Overlay>
    )
  }
}

export default observer(Radium(BlockWordsEditor))
