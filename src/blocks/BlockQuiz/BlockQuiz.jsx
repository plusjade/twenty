import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import style from './style'

class BlockQuiz extends PureComponent {
  static propTypes = {
    block: PropTypes.object.isRequired,
    sceneTransition: PropTypes.func.isRequired,
  }

  static initialState() {
    return ({
      answer: {},
    })
  }

  state = BlockQuiz.initialState()

  resetState = () => {
    this.setState(BlockQuiz.initialState())
  }

  componentDidMount() {
    this.props.block.player.on('start', this.onStart)
  }

  onSelect = (answer) => {
    this.setState({answer: answer})
    this.props.sceneTransition({option: answer.value})
  }

  onStart = () => {
    this.setState({isActivated: true})
  }

  render() {
    return (
      <div style={style.wrap}>
        {this.props.block.data.answers.map((answer, i) => (
          <button
            key={i}
            style={[
              style.button.default,
              style.button.animate,
            ]}
            onClick={() => {
              this.onSelect(answer)
            }}
          >
            {answer.name}
          </button>
        ))}
      </div>
    )
  }
}

export default Radium(BlockQuiz)
