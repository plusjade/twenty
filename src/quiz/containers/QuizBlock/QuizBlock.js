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
    const sceneId = this.props.block.nextScenes[answer.value]
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
        <h1 style={style.question.default}>
          {question}
        </h1>
        {answers.map((answer, i) => (
          <button
            key={i}
            style={[
              style.button.default,
              this.state.answer.name === answer.name && style.button.active,
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
