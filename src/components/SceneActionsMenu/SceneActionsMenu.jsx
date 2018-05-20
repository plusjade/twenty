import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ActionTap from 'components/ActionTap/ActionTap'
import style from './style'

class SceneActionsMenu extends PureComponent {
  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    addScene: PropTypes.func.isRequired,
    unStageBlock: PropTypes.func.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    toggleBottomPanel: PropTypes.func.isRequired,
    scenePosition: PropTypes.number.isRequired,
    totalScenes: PropTypes.number.isRequired,
    activeSceneId: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
  }

  state = {
    isExpanded: true
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapRemoveScene = () => {
    // noop
  }

  handleTapToggle = () => {
    this.setState({isExpanded: !this.state.isExpanded}, () => {
      if (this.state.isExpanded) {
        this.props.unStageBlock()
      } else {
        this.props.toggleBottomPanel(false)
      }
    })
  }

  render() {
    return (
      <div
        style={[
          style.default,
          this.props.isEditing && style.active
        ]}
      >
        <ActionTap
          onTap={this.handleTapToggle}
          dark={this.state.isExpanded}
        >
          <span>
            {`${this.props.scenePosition}/${this.props.totalScenes}`}
          </span>
        </ActionTap>
        <div
          style={[
            style.tools,
            this.state.isExpanded && style.active
          ]}
        >
          <ActionTap
            onTap={this.handleTapLeft}
            disabled={this.props.scenePosition <= 1}
          >
            <div style={{transform: "rotate(180deg)"}}>
              {"➜"}
            </div>
          </ActionTap>

          <ActionTap
            onTap={this.handleTapRight}
            disabled={this.props.scenePosition >= this.props.totalScenes}
          >
            <div>{"➜"}</div>
          </ActionTap>
        </div>
      </div>
    )
  }
}

export default Radium(SceneActionsMenu)
