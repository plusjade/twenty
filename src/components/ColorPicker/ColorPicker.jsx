import React, { PureComponent } from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Draggable from 'gsap/Draggable'
import style from './style'

class ColorPicker extends PureComponent {
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

  componentDidMount() {
    const rotation = this.props.initialValue ? 360 - this.props.initialValue : 0
    window.TweenMax.set(this.refNode, {transformOrigin: "center"})
    this.dialPos = window.TweenMax.set(
      this.refNode, {x:'+=0', rotation: rotation}
    )

    Draggable.create(this.refNode, {
      type: "rotation",
      onDrag: this.calculate,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.value !== prevState.value && typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.value)
    }
  }

  getRef = (node) => {
    this.refNode = node
  }

  getColor() {
    return `hsl(${this.state.value}, 100%, 50%)`
  }

  calculate = () => {
    const value = parseInt(this.dialPos.target._gsTransform.rotation % 360, 10)
    let hi = 0
    if (+value > 0) {
      hi = 360 - +value
    } else {
      hi = Math.abs(360 - value)
    }

    if (hi > 360) {
      hi = hi - 360
    }

    this.setState({value: hi})
  }

  render() {
    return(
      <div style={style.outer}>
        <div
          style={style.mover}
          ref={this.getRef}
        >
          <div style={style.inner}>
            {this.state.value}
          </div>
        </div>
        <div
          style={[
            style.pointer,
            {backgroundColor: this.getColor()}
          ]}
        />
      </div>
    )
  }
}

export default Radium(ColorPicker)
