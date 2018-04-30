import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

const MAX_HEIGHT = 200

class EnterText extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  state = {
    value: "",
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value})
    }
  }

  reset = () => {
    this.setState({value: ""})
    this.handleResize()
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
    this.handleResize()
  }

  handleResize = () => {
    this.inputRef.style.height = "" // Reset the height
    this.inputRef.style.height = Math.min(this.inputRef.scrollHeight, MAX_HEIGHT) + "px"
  }

  refInput = (node) => {
    if (node) { this.inputRef = node}
  }

  handleSubmitCustom = () => {
    this.props.onSubmit(this.state.value)
    this.setState({value: ""})
  }

  render() {
    return (
      <div style={style.level1}>
        <textarea
          style={style.input}
          rows={1}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          ref={this.refInput}
        />
        <Hammer onTap={this.handleSubmitCustom}>
          <button
            style={[
              style.inputButton,
              this.state.value && style.inputButtonActive,
            ]}
          >
            {"Add"}
          </button>
        </Hammer>
      </div>
    )
  }
}

export default Radium(EnterText)
