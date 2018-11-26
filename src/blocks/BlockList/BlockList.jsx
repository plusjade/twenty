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

class BlockList extends Component {
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
    const content = (
      `<li>${getTextContent(this.props.block).join('</li><li style="margin-top:8px">')}</li>`
    )

    return (
      <div
        id={`block_${this.props.block.get('id')}`}
        ref={this.getRef}
        style={[
          style.default,
          this.props.block.get('lifecycle') !== 'edit' && {zIndex: 1},
        ]}
      >
        <ul
          style={[
            style.ul,
            {
              color: getColor(this.props.block),
            },
          ]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{__html: content}}
        />
      </div>
    )
  }
}

export default observer(Radium(BlockList))
