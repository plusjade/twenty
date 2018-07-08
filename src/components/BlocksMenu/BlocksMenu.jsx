import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import ActionCard from 'components/ActionCard/ActionCard'
import style from './style'

class BlocksMenu extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    videoPlayer: PropTypes.object.isRequired,
  }

  handleTapWords = () => {
    this.props.videoPlayer.addBlock('words')
    this.props.blocksMenuToggle()
  }

  handleTapText = () => {
    this.props.videoPlayer.addBlock('text')
    this.props.blocksMenuToggle()
  }

  handleTapScene = () => {
    this.props.videoPlayer.addScene()
    this.props.blocksMenuToggle()
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        onTap={this.props.blocksMenuToggle}
      >
        <ActionCardsMenu>
          <ActionCard onTap={this.handleTapScene}>
            <div>Add Scene</div>
          </ActionCard>

          <ActionCard onTap={this.handleTapWords}>
            <div>Heading</div>
          </ActionCard>

          <ActionCard onTap={this.handleTapText}>
            <div>Paragraph</div>
          </ActionCard>
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default Radium(BlocksMenu)
