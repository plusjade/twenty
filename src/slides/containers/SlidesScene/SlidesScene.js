import React, {Component}   from 'react'
import PropTypes            from 'prop-types'
import PlayerOverlay        from 'components/PlayerOverlay/PlayerOverlay'
import SlidesBot            from 'slides/lib/SlidesBot'
import style                from './Style'

class SlidesScene extends Component {
  static propTypes = {
    sceneIndex: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.initialState = this.initialState.bind(this)
    this.resetState = this.resetState.bind(this)
    this.state = this.initialState()
  }

  initialState() {
    return ({
      type: undefined,
      data: "",
      index: undefined,
    })
  }

  resetState() {
    this.setState(this.initialState())
  }

  componentDidMount() {
    this.props.mountBot("slides", (
      SlidesBot((text, index) => {
        this.setState({type: "title", data: text, index: index})
      })
    ))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sceneIndex !== this.props.sceneIndex) {
      this.setState({data: ""})
    }
  }

  render() {
    if (!this.props.isActive) { return null }

    switch (this.state.type) {
      case "title": {
        return (
          <PlayerOverlay {...this.props}>
            <div style={style.default}>
              <h1 style={style.text}>
                {this.state.data}
              </h1>
            </div>
          </PlayerOverlay>
        )
      }
      case "orderedList": {
        return (
          <PlayerOverlay>
            <ul>
            {this.state.data.map((line) => <li>{line}</li>)}
            </ul>
          </PlayerOverlay>
        )
      }
      case "image": {
        return (
          <PlayerOverlay>
            <img
              src={this.state.data}
              style={{width: "80%", height: "auto"}}
              alt=""
            />
          </PlayerOverlay>
        )
      }
      case "error": {
        return (
          <PlayerOverlay>
            <span>There was an error</span>
          </PlayerOverlay>
        )
      }
      default: {
        return (
          <PlayerOverlay>
            <h1 style={style.default}>
              {this.state.data}
            </h1>
          </PlayerOverlay>
        )
      }
    }
  }
}

export default SlidesScene
