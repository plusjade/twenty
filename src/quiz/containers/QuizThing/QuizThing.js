import Radium from 'radium'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Layer from 'components/Layer/Layer'

import style from './Style'

class QuizThing extends PureComponent {
  static propTypes = {
    thing: PropTypes.object.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
  }

  static initialState() {
    return ({
      answer: {},
    })
  }

  state = QuizThing.initialState()

  resetState = () => {
    this.setState(QuizThing.initialState())
  }

  componentDidMount() {
    this.props.thing.player.on('start', this.onStart)
  }

  onSelect = (answer) => {
    this.setState({answer: answer})
    const sceneId = this.props.thing.nextScenes[answer.value]
    this.props.setActiveSceneId(sceneId)
    this.props.play()
  }

  onStart = () => {
    this.setState({isActivated: true}, this.props.pause)
  }

  render() {
    const question = this.props.thing.initialPayload.question
    const answers = this.props.thing.initialPayload.answers
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

export default Radium(QuizThing)
