import React, { PureComponent } from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import ActionCardsMenu from 'components/ActionCardsMenu/ActionCardsMenu'
import ActionCard from 'components/ActionCard/ActionCard'

class PickerAlign extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    initialValue: PropTypes.number,
  }

  static defaultProps = {
    initialValue: 0
  }

  constructor(props) {
    super(props)
    if (props.initialValue) {
      this.state = {
        value: this.props.initialValue
      }
    }
  }

  handleLeft = () => {
    this.props.onChange('left')
  }

  handleCenter = () => {
    this.props.onChange('center')
  }

  handleRight = () => {
    this.props.onChange('right')
  }

  render() {
    return(
      <ActionCardsMenu>
        <ActionCard onTap={this.handleLeft}>
          <div>Left</div>
        </ActionCard>

        <ActionCard onTap={this.handleCenter}>
          <div>Center</div>
        </ActionCard>

        <ActionCard onTap={this.handleRight}>
          <div>Right</div>
        </ActionCard>
      </ActionCardsMenu>
    )
  }
}

export default Radium(PickerAlign)
