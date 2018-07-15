import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import ActionCard from 'components/ActionCard/ActionCard'

class BlocksMenu extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    videoPlayer: PropTypes.object.isRequired,
  }

  handleTapWords = () => {
    this.props.videoPlayer.addBlock('words')
  }

  handleTapText = () => {
    this.props.videoPlayer.addBlock('text')
  }

  handleTapPreview = () => {
    window.location.href = `/?id=${this.props.video.id}`
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
      >
        <ActionCardsMenu>
          <ActionCard onTap={this.handleTapWords}>
            <div>Heading</div>
          </ActionCard>

          <ActionCard onTap={this.handleTapText}>
            <div>Paragraph</div>
          </ActionCard>

          <ActionCard onTap={this.handleTapPreview}>
            <div>[Preview]</div>
          </ActionCard>
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default Radium(BlocksMenu)
