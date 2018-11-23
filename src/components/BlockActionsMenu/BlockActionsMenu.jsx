import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import BlockAction from 'components/BlockAction/BlockAction'

class BlockActionsMenu extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    editorState: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Overlay isActive={this.props.isActive}>
        <ActionCardsMenu>
          {this.props.editorState.activePickers.map(picker => (
            <BlockAction
              key={picker.type}
              picker={picker}
              editorState={this.props.editorState}
            />
          ))}
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default observer(Radium(BlockActionsMenu))
