import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import ActionCard from 'components/ActionCard/ActionCard'
import style from './style'

class BlockList extends PureComponent {
  static propTypes = {
    addBlock: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
  }

  handleTapWords = () => {
    this.props.addBlock('words')
    this.props.toggleAddBlock()
  }

  handleTapText = () => {
    this.props.addBlock('text')
    this.props.toggleAddBlock()
  }

  handleTapScene = () => {
    this.props.addScene()
    this.props.toggleAddBlock()
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        onTap={this.props.toggleAddBlock}
      >
        <ActionCard onTap={this.handleTapWords}>
          <div>Add Caption</div>
        </ActionCard>

        <ActionCard onTap={this.handleTapScene}>
          <div>
            <span role="img" aria-label="scene">🎬</span>
            <span> Add Scene </span>
          </div>
        </ActionCard>
      </Overlay>
    )
  }
}

export default Radium(BlockList)
