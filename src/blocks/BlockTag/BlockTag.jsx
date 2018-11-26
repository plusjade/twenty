import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  getColor,
  getTextContent,
} from 'lib/transforms'

import style from './style'

class BlockTag extends Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    videoPlayer: PropTypes.object.isRequired,
  }

  getRef = (node) => {
    if (node) { this.node = node}
  }

  handleFocus = () => {
    this.props.videoPlayer.unStageBlock()
  }

  handleBlur = () => {
    if (this.node) {
      const content = this.node.innerText
      this.props.block.set('content', content)
    }
  }

  render() {
    const content = getTextContent(this.props.block)

    return (
      <div
        id={`block_${this.props.block.get('id')}`}
        style={[
          style.default,
          this.props.block.get('lifecycle') !== 'edit' && {zIndex: 1},
        ]}
      >
        <h1
          ref={this.getRef}
          style={[
            style.text,
            {
              color: getColor(this.props.block),
            },
            this.props.block.get('lifecycle') === 'edit' && style.isStaged,
          ]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          contentEditable
          dangerouslySetInnerHTML={{__html: content.join(' ')}}
        />
      </div>
    )
  }
}

export default observer(Radium(BlockTag))
