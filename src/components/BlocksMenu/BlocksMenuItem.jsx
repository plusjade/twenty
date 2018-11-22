import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ActionCard from 'components/ActionCard/ActionCard'

class BlocksMenuItem extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    videoPlayer: PropTypes.object.isRequired,
  }

  handleTap = () => {
    this.props.videoPlayer.addBlock(this.props.data.id)
  }

  render() {
    return (
      <ActionCard onTap={this.handleTap}>
        <div>{this.props.data.name}</div>
      </ActionCard>
    )
  }
}

export default Radium(BlocksMenuItem)
