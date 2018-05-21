import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import ActionCard from 'components/ActionCard/ActionCard'
import style from './style'

class SceneActionsMenu extends PureComponent {
  static propTypes = {
    addScene: PropTypes.func.isRequired,
    unStageBlock: PropTypes.func.isRequired,
    sceneTransition: PropTypes.func.isRequired,
    toggleBottomPanel: PropTypes.func.isRequired,
    scenePosition: PropTypes.number.isRequired,
    totalScenes: PropTypes.number.isRequired,
    activeSceneId: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
  }

  handleTapRight = () => {
    this.props.sceneTransition()
  }

  handleTapLeft = (e) => {
    this.props.sceneTransition({option: 'prev'})
  }

  onTapDelete = () => {
    // noop
  }

  onTapColor = () => {
    this.props.toggleBottomPanel()
  }

  handleTapScene = () => {
    this.props.addScene()
    // this.props.blocksMenuToggle()
  }

  render() {
    return (
      <Overlay
        isActive={this.props.isActive}
        onTap={this.props.scenesMenuToggle}
      >
        <ActionCardsMenu>
          <ActionCard onTap={this.onTapColor}>
            <div style={style.inner}>
              <div style={style.emoji}>
                <span role="img" aria-label="color">🎨</span>
              </div>
              <div style={style.text}>Color</div>
            </div>
          </ActionCard>

          <ActionCard
            onTap={this.handleTapLeft}
            disabled={this.props.scenePosition <= 1}
          >
            <div style={style.inner}>
              <div style={[style.emoji, {transform: "rotate(180deg)"}]}>
                <span>
                  ➜
                </span>
              </div>
              <div style={style.text}>Prev Scene</div>
            </div>
          </ActionCard>

          <ActionCard
            onTap={this.handleTapRight}
            disabled={this.props.scenePosition >= this.props.totalScenes}
          >
            <div style={style.inner}>
              <div style={style.emoji}>
                ➜
              </div>
              <div style={style.text}>Next Scene</div>
            </div>
          </ActionCard>

          <ActionCard onTap={this.handleTapScene}>
            <div style={style.inner}>
              <div style={style.emoji}>
                <span role="img" aria-label="color">🎬</span>
              </div>
              <div style={style.text}>Add Scene</div>
            </div>
          </ActionCard>
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default Radium(SceneActionsMenu)
