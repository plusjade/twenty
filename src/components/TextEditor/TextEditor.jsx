import { observer } from "mobx-react"
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import EnterText from 'components/EnterText/EnterText'

import style from './style'

class TextEditor extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    stagedBlockId: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    editBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    getStagedBlock: PropTypes.func.isRequired,
  }

  onEnterText = (value) => {
    if (value) {
      this.props.editBlock(this.props.stagedBlockId, {content: value})
    } else {
      this.props.removeBlock(this.props.stagedBlockId)
    }
    this.props.toggleEditText()
  }

  onChangeText = (value) => {
    if (value) {
      this.props.video.editBlock(this.props.stagedBlockId, {content: value})
    }
  }

  getStagedText = () => {
    const block = this.props.getStagedBlock()

    if (!block) { return '' }

    return (
      block.get('content') || (block.get('data') && block.get('data').content)
    )
  }

  render() {
    return (
      <div
        style={[
          style.wrap,
          this.props.isActive && style.isActive,
        ]}
      >
        <EnterText
          value={this.getStagedText()}
          onSubmit={this.onEnterText}
          onChange={this.onChangeText}
          isActive
        />
      </div>
    )
  }
}

export default Radium(observer(TextEditor))
