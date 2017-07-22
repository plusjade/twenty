import React, {Component}   from 'react'
import PlayerOverlay        from 'components/PlayerOverlay'
import SlidesBot            from 'slides/lib/SlidesBot'

const Style = {
  default: {
    textAlign: "left",
    fontSize: "54px",
    margin: "auto",
    padding: "0 10px",
    maxWidth: "800px",
  }
}

class SlidesScene extends Component {
  constructor(props) {
    super(props)
      this.initialState = this.initialState.bind(this)
      this.resetState = this.resetState.bind(this)
      this.state = this.initialState()
  }

  initialState() {
    return ({
      slide: {},
    })
  }

  resetState() {
    this.setState(this.initialState())
  }

  componentDidMount() {
    this.props.mountBot("slides", (
      SlidesBot((text, index) => {
        this.setState({slide: {type: "title", data: text, index: index}})
      })
    ))
  }

  render() {
    if (!this.props.isActive) { return null }

    switch (this.state.slide.type) {
      case "title": {
        return (
          <PlayerOverlay backgroundColor="#44a0dd" {...this.props}>
            <h1 style={Style.default}>
              {this.state.slide.data}
            </h1>
          </PlayerOverlay>
        )
      }
      case "orderedList": {
        return (
          <PlayerOverlay backgroundColor="#44a0dd">
            <ul>
            {this.state.slide.data.map((line) => <li>{line}</li>)}
            </ul>
          </PlayerOverlay>
        )
      }
      case "image": {
        return (
          <PlayerOverlay backgroundColor="#44a0dd">
            <img src={this.state.slide.data} style={{width: "80%", height: "auto"}}/>
          </PlayerOverlay>
        )
      }
      case "error": {
        return (
          <PlayerOverlay backgroundColor="#44a0dd">
            <span>There was an error</span>
          </PlayerOverlay>
        )
      }
      default: {
        return (
          <PlayerOverlay backgroundColor="#44a0dd">
            <h1 style={Style.default}>
              {this.state.slide.data}
            </h1>
          </PlayerOverlay>
        )
      }
    }
  }
}

export default SlidesScene
