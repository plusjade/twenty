import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Hammer from 'react-hammerjs'

import style from './style'

const MAX_HEIGHT = 200

class EnterText extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value && nextProps.value !== prevState.value) {
      return ({value: nextProps.value})
    }

    return null
  }

  state = {
    value: "",
  }

  componentDidMount() {
    if(this.props.isActive) {
      this.setState({value: this.props.value || ""}, this.focus)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value && this.state.value !== prevState.value) {
      this.focus()
    } else if(this.props.isActive && !prevProps.isActive) {
      this.focus()
    }
  }

  focus = () => {
    this.handleResize()
    // this.inputRef.focus()
  }

  reset = () => {
    this.setState({value: ""})
    this.handleResize()
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e.target.value)
    }
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

  moveCaretAtEnd(e) {
    const temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  render() {
    return (
      <div style={[style.wrap, this.props.isActive && style.isActive]}>
        <textarea
          style={style.input}
          rows={1}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          ref={this.refInput}
          onFocus={this.moveCaretAtEnd}
        />
        <Hammer onTap={this.handleSubmitCustom}>
          <button
            style={[
              style.inputButton,
              this.state.value && style.inputButtonActive,
            ]}
          >
            {this.state.value ? "DONE" : "DELETE"}
          </button>
        </Hammer>
      </div>
    )
  }
}

export default Radium(EnterText)
