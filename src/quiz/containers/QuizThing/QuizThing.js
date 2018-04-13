import Radium                   from 'radium'
import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import Layer                from 'components/Layer/Layer'

import style from './Style'

class QuizThing extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    mountBot: PropTypes.func.isRequired,
    sceneIndex: PropTypes.number.isRequired,
  }

  static initialState() {
    return ({
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
    // this.props.mountBot("quiz", (
    //   QuizBot(this.onTick, this.initialPayloadDidUpdate)
    // ))

    this.props.scene.player.addUpdateCallback(
      this.onTick
    )
    this.props.scene.player.addEmitPayloadCallback(
      this.initialPayloadDidUpdate
    )

    this.props.pause()
  }

  componentWillReceiveProps(nextProps) {
    // transitioning from inactive to active
    if (!this.props.isActive && nextProps.isActive) {
      this.props.pause()
    }
  }

  onSelect = (answer) => {
    this.setState({answer: answer})
    this.props.play()
  }

  onTick = () => {
    // noop
  }

  initialPayloadDidUpdate = ({sceneIndex, initialPayload}) => {
    if (sceneIndex === this.state.sceneIndex) { return }
    this.setState({
      sceneIndex: sceneIndex,
      answers: initialPayload.answers,
      question: initialPayload.question,
    })
  }

  render() {
    if (!this.props.isActive) { return null }

    return (
      // <Layer style={{zIndex: 2}}>
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
      // </Layer>
    )
  }
}

export default Radium(QuizThing)
