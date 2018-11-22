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
    blocksRegistry: PropTypes.array.isRequired,
  }

  handleTap = (name) => {
    this.props.videoPlayer.addBlock(name)
  }

  render() {
    return (
      <Overlay isActive={this.props.isActive}>
        <ActionCardsMenu>
          {this.props.blocksRegistry.map(data => (
            <ActionCard onTap={this.handleTap.bind(this, data.id)}>
              <div>{data.name}</div>
            </ActionCard>
          ))}
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default Radium(BlocksMenu)
