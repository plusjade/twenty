import Radium                   from 'radium'
import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import Layer                from 'components/Layer/Layer'

import style from './Style'

class QuizThing extends Component {
  static propTypes = {
    thing: PropTypes.object.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
  }

  static initialState() {
    return ({
      isActivated: false,
      question: undefined,
      answers: [],
      answer: {},
    })
  }

  state = QuizThing.initialState()

  resetState = () => {
    this.setState(QuizThing.initialState())
  }

  componentDidMount() {
    this.props.thing.player.on(
      'play',
      this.initialPayloadDidUpdate
    )
  }

  onSelect = (answer) => {
    this.setState({answer: answer})
    this.props.play()
  }

  initialPayloadDidUpdate = ({initialPayload}) => {
    if (this.state.isActivated) { return }
    this.setState({
      isActivated: true,
      answers: initialPayload.answers,
      question: initialPayload.question,
    }, this.props.pause)
  }

  render() {
    return (
      <div>
        <h1 style={style.question.default}>
          {this.state.question}
        </h1>
        {this.state.answers.map((answer, i) => (
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
