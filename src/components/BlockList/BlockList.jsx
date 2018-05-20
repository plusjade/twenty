import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import AddBlockButton from 'components/AddBlockButton/AddBlockButton'
import style from './style'

class BlockList extends PureComponent {
  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    addBlock: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
  }

  handleTapWords = () => {
    this.props.addBlock('words')
  }

  handleTapText = () => {
    this.props.addBlock('text')
  }

  handleTapScene = () => {
    this.props.addScene()
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        onTap={this.props.toggleAddBlock}
        full
      >
        <div
          style={[
            style.wrap.default,
            style.wrap.active
          ]}
        >
          <AddBlockButton onTap={this.handleTapWords}>
            <div>Add Caption</div>
          </AddBlockButton>

          <AddBlockButton onTap={this.handleTapScene}>
            <div>
              <span role="img" aria-label="scene">🎬</span>
              <span> Add Scene </span>
            </div>
          </AddBlockButton>
        </div>
      </Overlay>
    )
  }
}

export default Radium(BlockList)
