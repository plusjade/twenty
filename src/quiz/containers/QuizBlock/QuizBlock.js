import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import style from './style'

class QuizBlock extends PureComponent {
  static propTypes = {
    block: PropTypes.object.isRequired,
    nextScene: PropTypes.func.isRequired,
  }

  static initialState() {
    return ({
      answer: {},
    })
  }

  state = QuizBlock.initialState()

  resetState = () => {
    this.setState(QuizBlock.initialState())
  }

  componentDidMount() {
    this.props.block.player.on('start', this.onStart)
  }

  onSelect = (answer) => {
    this.setState({answer: answer})
    const sceneId = this.props.block.transitions[answer.value]
    this.props.nextScene(sceneId)
  }

  onStart = () => {
    this.setState({isActivated: true})
  }

  render() {
    return (
      <div style={style.wrap}>
        {this.props.block.payload.answers.map((answer, i) => (
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

export default Radium(QuizBlock)
