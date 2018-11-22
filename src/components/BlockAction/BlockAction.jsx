import { observer } from "mobx-react"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import ActionCard from 'components/ActionCard/ActionCard'
import style from './style'

class BlockAction extends Component {
  static propTypes = {
    picker: PropTypes.object.isRequired,
    videoPlayer: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
  }

  onTap = () => {
    const { type } = this.props.picker

    if (type === 'delete') {
      if (window.confirm('Delete this block forever?')) {
        this.props.videoPlayer.removeBlockActive()
      }
    } else {
      this.props.editor.setPicker({type})
    }
  }

  render() {
    return (
      <ActionCard onTap={this.onTap}>
        <div style={style.inner}>
          <div style={style.text}>
            {this.props.picker.name}
          </div>
          <div style={style.emoji}>
            <span role="img" aria-label="edit">
              {this.props.picker.emoji}
            </span>
          </div>
        </div>
      </ActionCard>
    )
  }
}

export default observer(Radium(BlockAction))
