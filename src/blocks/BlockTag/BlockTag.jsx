import { observer } from 'mobx-react'
import { reaction } from 'mobx'
import Radium from 'radium'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import {
  getColor,
  getTextContent,
  getFontSize,
  getTextAlign,
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

  handleTap = () => {
    this.props.videoPlayer.stageBlock(this.props.block.get('id'))
    if (this.node) {
      this.node.scrollIntoView({block: 'start', behavior: 'smooth'})
    }
  }

  render() {
    const content = getTextContent(this.props.block)

    return (
      <div
        id={`block_${this.props.block.get('id')}`}
        ref={this.getRef}
        style={[
          style.default,
          this.props.block.get('lifecycle') !== 'edit' && {zIndex: 1},
        ]}
      >
        <Hammer onTap={this.handleTap}>
          <h1
            style={[
              style.text,
              {
                color: getColor(this.props.block),
                fontSize: getFontSize(this.props.block),
                textAlign: getTextAlign(this.props.block),
              },
              this.props.block.get('lifecycle') === 'edit' && style.isStaged,
            ]}
          >
            {content.map((string, i) => (
              <span key={i} style={{display: 'block'}}>
                {string}
              </span>
            ))}
          </h1>
        </Hammer>
      </div>
    )
  }
}

export default observer(Radium(BlockTag))
