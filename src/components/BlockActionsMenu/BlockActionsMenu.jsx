import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import BlockAction from 'components/BlockAction/BlockAction'

const pickerTypes = [
  {
    type: 'text',
    name: 'text',
    emoji: '✍️',
  },
  {
    type: 'color',
    name: 'color',
    emoji: '🎨',
  },
  {
    type: 'align',
    name: 'align',
    emoji: '⇆',
  },
  {
    type: 'size',
    name: 'size',
    emoji: 'A',
  },
  {
    type: 'delete',
    name: 'DELETE',
    emoji: '😵',
  },
]

class BlockActionsMenu extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    videoPlayer: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
  }

  render() {
    const pickers = this.props.videoPlayer.activePickers
    return (
      <Overlay isActive={this.props.isActive}>
        <ActionCardsMenu>
          {pickerTypes.map((picker) => {
            if (!pickers.includes(picker.type)) { return null }
            return (
              <BlockAction
                key={picker.type}
                picker={picker}
                videoPlayer={this.props.videoPlayer}
                editorState={this.props.editorState}
              />
            )
          })}
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default observer(Radium(BlockActionsMenu))
