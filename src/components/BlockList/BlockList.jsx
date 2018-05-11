import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import EditorButton from 'components/EditorButton/EditorButton'
import style from './style'

class BlockList extends PureComponent {
  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    addBlock: PropTypes.func.isRequired,
  }

  handleTapWords = () => {
    this.props.addBlock()
  }

  render() {
    return (
      <div
        style={[
          style.wrap.default,
          this.props.isEditing && style.wrap.active
        ]}
      >
        <EditorButton onTap={this.handleTapWords}>
          <div>{"+"}</div>
        </EditorButton>
      </div>
    )
  }
}

export default Radium(BlockList)
