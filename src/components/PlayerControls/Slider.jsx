import Radium                   from 'radium'
import React, {PureComponent}   from 'react'
import PropTypes                from 'prop-types'

import Style                  from './Style'

import MSlider                 from 'material-ui/Slider'
import darkBaseTheme          from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme            from 'material-ui/styles/getMuiTheme'


class Slider extends PureComponent {
  static propTypes = {

  }

  render() {
    return (
      <div style={[Style.wrap.default]}>
        {this.props.isPlayable() && (
          <div style={Style.one}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <MSlider
                min={0}
                max={this.props.timeDuration}
                value={this.props.timePosition}
                onChange={(e, value) => {
                  const time = Math.floor(parseFloat(value))
                  if (time >= 0) {
                    this.props.seekTo(time)
                  }
                }}
                style={{width: "100%"}}
                sliderStyle={{margin: 0}}
              />
            </MuiThemeProvider>
          </div>
        )}
      </div>
    )
  }
}

export default Slider
