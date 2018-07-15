import React, { PureComponent } from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Draggable from 'gsap/Draggable'
import ActionTap from 'components/ActionTap/ActionTap'
import { getColorHsl } from 'lib/transforms'
import style from './style'

class ColorPicker extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    initialValue: PropTypes.number,
    isGrayscale: PropTypes.bool,
  }

  static defaultProps = {
    initialValue: 0,
    isGrayscale: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: this.reverseComputeColorValue(+this.props.initialValue)
    }
  }

  componentDidMount() {
    const rotation = this.props.initialValue ? 360 - this.props.initialValue : 0
    this.dialPos = window.TweenMax.set(this.refNode, {x:'+=0', rotation: rotation})
    Draggable.create(this.refNode, {
      type: "rotation",
      onDrag: this.calculate,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.value !== prevState.value && typeof this.props.onChange === 'function') {
      this.props.onChange(this.computeColorValue())
    }
  }

  computeColorValue = () => (
    this.props.isGrayscale
      ? -Math.floor((this.state.value / 360) * 100)
      : this.state.value
  )

  reverseComputeColorValue = value => (
    this.props.isGrayscale
      ? Math.floor(Math.abs(value) / 100 * 360)
      : value
  )

  getRef = (node) => {
    this.refNode = node
  }

  getColor() {
    return getColorHsl(this.computeColorValue())
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

  handleTapGray = () => {
    this.props.onChange(-1)
  }

  handleTapColor = () => {
    this.props.onChange(180)
  }

  render() {
    return(
      <div style={style.wrap}>
        <div>
          <ActionTap onTap={this.handleTapGray}>
            <div>
              Gray
            </div>
          </ActionTap>
          <ActionTap onTap={this.handleTapColor}>
            <div>
              Color
            </div>
          </ActionTap>
        </div>
        <div style={style.outer}>
          <div
            style={[
              style.mover,
              this.props.isGrayscale && style.isGrayscale
            ]}
            ref={this.getRef}
          >
            <div style={style.inner}>
              {this.computeColorValue()}
            </div>
          </div>
          <div
            style={[
              style.pointer,
              {backgroundColor: this.getColor()}
            ]}
          />
        </div>
      </div>
    )
  }
}

export default Radium(ColorPicker)
