import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import EditorButton from 'components/EditorButton/EditorButton'
import style from './style'

class SceneEditor extends PureComponent {
  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    addScene: PropTypes.func.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    scenePosition: PropTypes.number.isRequired,
    totalScenes: PropTypes.number.isRequired,
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  handleTapScene = () => {
    this.props.addScene()
  }

  handleTapRemoveScene = () => {
    // noop
  }

  render() {
    return (
      <div
        style={[
          style.wrap.default,
          this.props.isEditing && style.wrap.active
        ]}
      >
        <div style={{flex: 1}} />

        <EditorButton
          onTap={this.handleTapLeft}
          disabled={this.props.scenePosition <= 1}
        >
          <div style={{transform: "rotate(180deg)"}}>
            {"➜"}
          </div>
        </EditorButton>

        <EditorButton bigger>
          <span>
            {`${this.props.scenePosition}/${this.props.totalScenes}`}
          </span>
        </EditorButton>

        <EditorButton
          onTap={this.handleTapRight}
          disabled={this.props.scenePosition >= this.props.totalScenes}
        >
          <div>{"➜"}</div>
        </EditorButton>

        <EditorButton onTap={this.handleTapScene}>
          <div>{"🎬"}</div>
        </EditorButton>
      </div>
    )
  }
}

export default Radium(SceneEditor)
