import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import BlocksMenuItem from './BlocksMenuItem'

class BlocksMenu extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    videoPlayer: PropTypes.object.isRequired,
    blocksRegistry: PropTypes.array.isRequired,
  }

  render() {
    return (
      <Overlay isActive={this.props.isActive}>
        <ActionCardsMenu>
          {this.props.blocksRegistry.map(data => (
            <BlocksMenuItem
              data={data}
              videoPlayer={this.props.videoPlayer}
            />
          ))}
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default Radium(BlocksMenu)
