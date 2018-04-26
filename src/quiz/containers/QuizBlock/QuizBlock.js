import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import style from './style'

class QuizBlock extends PureComponent {
  static propTypes = {
    block: PropTypes.object.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
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
    setTimeout(() => {
      this.setState({animate: true})
    }, 10)
  }

  onSelect = (answer) => {
    this.setState({answer: answer})
    const sceneId = this.props.block.transitions[answer.value]
    this.props.nextScene(sceneId)
    this.props.play()
  }

  onStart = () => {
    this.setState({isActivated: true})
  }

  render() {
    const question = this.props.block.payload.question
    const answers = this.props.block.payload.answers
    return (
      <div style={style.wrap}>
        <div style={{marginBottom: 40, width: '100%'}}>
          <h1
            style={[
              style.question.default,
              this.state.animate && style.question.animate
            ]}
          >
            {question}
          </h1>
        </div>
        {answers.map((answer, i) => (
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
