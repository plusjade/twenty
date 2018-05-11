import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import EditorButton from 'components/EditorButton/EditorButton'
import EnterText from 'components/EnterText/EnterText'
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

  onChange = (value) => {
    if (value) {
      this.props.video.editBlock(this.props.stagedBlockId, {content: value})
    }
  }

  getStagedText = () => {
    const block = this.props.getStagedBlock()

    if (!block) { return '' }

    return (
      block.get('content') || (block.get('data') && block.get('data').content)
    )
  }

  getStagedRotation = () => {
    const block = this.props.getStagedBlock()
    if (!block) { return 0 }
    const rotation = block.get('rotation') || 0
    if (!rotation) { return 0 }

    return rotation.replace('deg', '')
  }

  handleScaleUp = () => {
    const block = this.props.getStagedBlock()
    if (!block) { return }
    const scale = block.get('scale') || 1
    block.set('scale', (+scale + 0.1).toFixed(2))
  }

  handleScaleDown = () => {
    const block = this.props.getStagedBlock()
    if (!block) { return }
    const scale = block.get('scale') || 1
    block.set('scale', (+scale - 0.1).toFixed(2))
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
          isActive={true}
          value={this.getStagedText()}
          onSubmit={this.onEnterText}
          onChange={this.onChange}
        />

        <div style={{display: 'flex', paddingTop: 10}}>
          <EditorButton onTap={this.handleScaleDown} dark>
            <div>{"-"}</div>
          </EditorButton>
          <EditorButton dark>
            <div>
              {((this.props.getStagedBlock() && this.props.getStagedBlock().get('scale')) || 1) + 'x'}
            </div>
          </EditorButton>
          <EditorButton onTap={this.handleScaleUp} dark>
            <div>{"+"}</div>
          </EditorButton>
          <div style={{flex: 1}}>
            <input
              type="number"
              maxLength="3"
              value={this.getStagedRotation()}
              onChange={(e) => {
                const block = this.props.getStagedBlock()
                block.set('rotation', `${+e.target.value}deg`)
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(BlockWordsEditor)
