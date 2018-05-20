import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import ActionCard from 'components/ActionCard/ActionCard'
import style from './style'

class BlocksMenu extends PureComponent {
  static propTypes = {
    addBlock: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
  }

  handleTapWords = () => {
    this.props.addBlock('words')
    this.props.blocksMenuToggle()
  }

  handleTapText = () => {
    this.props.addBlock('text')
    this.props.blocksMenuToggle()
  }

  handleTapScene = () => {
    this.props.addScene()
    this.props.blocksMenuToggle()
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        onTap={this.props.blocksMenuToggle}
      >
        <ActionCardsMenu>
          <ActionCard onTap={this.handleTapWords}>
            <div>Add Caption</div>
          </ActionCard>

          <ActionCard onTap={this.handleTapScene}>
            <div>
              <span role="img" aria-label="scene">🎬</span>
              <span> Add Scene </span>
            </div>
          </ActionCard>
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default Radium(BlocksMenu)
