import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import ActionCard from 'components/ActionCard/ActionCard'
import style from './style'

class BlockActionsMenu extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    video: PropTypes.object.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
  }

  getStagedRotation = () => {
    const block = this.props.videoPlayer.block
    if (!block) { return 0 }
    const rotation = block.get('rotation') || 0
    if (!rotation) { return 0 }

    return rotation.replace('deg', '')
  }

  onChangeRotation = (value) => {
    const block = this.props.videoPlayer.block
    if (!block) { return }
    block.set('rotation', `${+value}deg`)
  }

  getStagedSize = () => {
    const defaultValue = 24
    const block = this.props.videoPlayer.block
    if (!block) { return defaultValue }
    const value = block.get('size') || defaultValue
    if (!value) { return defaultValue }

    return value
  }

  onChangeSize = (value) => {
    const block = this.props.videoPlayer.block
    if (!block) { return }
    block.set('size', value)
  }

  onTapColor = () => {
    this.props.toggleBottomPanel({type: 'color'})
  }

  onTapAlign = () => {
    this.props.toggleBottomPanel({type: 'align'})
  }

  onTapSize = () => {
    this.props.toggleBottomPanel({type: 'size'})
  }

  onTap = () => {
    this.props.videoPlayer.unStageBlock()
  }

  onTapDelete = () => {
    if (window.confirm('Delete this block forever?')) {
      this.props.removeBlock(this.props.videoPlayer.blockId)
    }
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        onTap={this.onTap}
      >
        <ActionCardsMenu>
          <ActionCard onTap={this.props.toggleEditText}>
            <div style={style.inner}>
              <div style={style.text}>Text</div>
              <div style={style.emoji}>
                <span role="img" aria-label="edit">✍️</span>
              </div>
            </div>
          </ActionCard>

          <ActionCard onTap={this.onTapColor}>
            <div style={style.inner}>
              <div style={style.text}>Color</div>
              <div style={style.emoji}>
                <span role="img" aria-label="color">🎨</span>
              </div>
            </div>
          </ActionCard>

          <ActionCard onTap={this.onTapAlign}>
            <div style={style.inner}>
              <div style={style.text}>Align</div>
              <div style={style.emoji}>
                <span role="img" aria-label="Align">⇆</span>
              </div>
            </div>
          </ActionCard>

          <ActionCard onTap={this.onTapSize}>
            <div style={style.inner}>
              <div style={style.text}>Size</div>
              <div style={style.emoji}>
                <span role="img" aria-label="Align">
                  <span style={{verticalAlign: "sub", fontSize: 6}}>A</span>
                  A
                </span>
              </div>
            </div>
          </ActionCard>

          <ActionCard onTap={this.onTapDelete}>
            <div style={style.inner}>
              <div style={style.text}>DELETE</div>
              <div style={style.emoji}>
                <span role="img" aria-label="color">😵</span>
              </div>
            </div>
          </ActionCard>
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default observer(Radium(BlockActionsMenu))
