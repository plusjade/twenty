import React, {Component}   from 'react'
import PlayerOverlay        from 'components/PlayerOverlay/PlayerOverlay'

import QuizBot from 'quiz/lib/QuizBot'
import style from './Style'

class QuizScene extends Component {
  constructor(props) {
    super(props)
      this.initialState = this.initialState.bind(this)
      this.resetState = this.resetState.bind(this)

      this.onSelect = this.onSelect.bind(this)
      this.state = this.initialState()
  }

  initialState() {
    return ({
      question: undefined,
      answers: [],
      answer: {},
    })
  }

  resetState() {
    this.setState(this.initialState())
  }

  componentDidMount() {
    this.props.mountBot("quiz", (
      QuizBot((data) => {
        this.setState(data)
      })
    ))
  }

  componentWillReceiveProps(nextProps) {
    // transitioning from inactive to active
    if (!this.props.isActive && nextProps.isActive) {
      this.props.pause()
    }
  }

  onSelect(answer) {
    this.setState({answer: answer})
    this.props.play()
  }

  render() {
    if (!this.props.isActive) { return null }

    return (
      <PlayerOverlay backgroundColor="#00796B">
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
      </PlayerOverlay>
    )
  }
}

export default QuizScene
