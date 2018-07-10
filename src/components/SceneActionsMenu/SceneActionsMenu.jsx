import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay/Overlay'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import ActionCard from 'components/ActionCard/ActionCard'
import style from './style'

class SceneActionsMenu extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    editor: PropTypes.object.isRequired,
  }

  onTapDelete = () => {
    // noop
  }

  onTapColor = () => {
    this.props.editor.setPicker({type: 'color'})
  }

  render() {
    return (
      <Overlay isActive={this.props.isActive}>
        <ActionCardsMenu>
          <ActionCard onTap={this.onTapColor}>
            <div style={style.inner}>
              <div style={style.emoji}>
                <span role="img" aria-label="color">🎨</span>
              </div>
              <div style={style.text}>Color</div>
            </div>
          </ActionCard>
        </ActionCardsMenu>
      </Overlay>
    )
  }
}

export default Radium(SceneActionsMenu)
