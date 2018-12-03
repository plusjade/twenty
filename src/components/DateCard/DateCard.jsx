import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DateHeading from 'components/DateHeading/DateHeading'
import style from './style'

class DateCard extends PureComponent {
  static propTypes = {
    dateString: PropTypes.string.isRequired,
    videoPlayer: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired
  }

  handleTap = () => {
    this.props.videoPlayer.addScene(this.props.date)
  }

  render() {
    return (
      <div style={style.wrap}>
        <DateHeading
          text={this.props.dateString}
          isToday={false}
          onTap={this.handleTap}
          hasContent={false}
        />
      </div>
    )
  }
}

export default Radium(DateCard)
