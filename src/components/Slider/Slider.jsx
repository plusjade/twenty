import Radium                   from 'radium'
import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'

import style                  from './style'

import MSlider                 from 'material-ui/Slider'
import darkBaseTheme          from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme            from 'material-ui/styles/getMuiTheme'

class Slider extends PureComponent {
  static propTypes = {
    step: PropTypes.number,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    dataType: PropTypes.string.isRequired,
  }

  static defaultProps = {
    step: 1,
  }

  handleChange = (e, value) => {
    this.props.onChange(value)
  }

  render() {
    return (
      <div
        style={[
          style.wrap.default,
        ]}
      >
        <div
          style={[
            style.inner, this.props.dataType === 'color' && style.color
          ]}
        >
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <MSlider
              axis={'y-reverse'}
              min={this.props.min}
              step={this.props.step}
              max={this.props.max}
              value={this.props.value}
              onChange={this.handleChange}
              style={{width: "100%", height: "100%"}}
              sliderStyle={{margin: 0}}
            />
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export default Radium(Slider)
