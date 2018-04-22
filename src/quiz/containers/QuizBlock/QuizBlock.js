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
  }

  onSelect = (answer) => {
    this.setState({answer: answer})
    const sceneId = this.props.block.transitions[answer.value]
    this.props.setActiveSceneId(sceneId)
    this.props.play()
  }

  onStart = () => {
    this.setState({isActivated: true}, this.props.pause)
  }

  render() {
    const question = this.props.block.initialPayload.question
    const answers = this.props.block.initialPayload.answers
    return (
      <div style={style.wrap}>
        <div style={{marginBottom: 40, width: '100%'}}>
          <h1 style={style.question.default}>
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
