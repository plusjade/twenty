import React, {Component}   from 'react'
import PlayerOverlay        from 'components/PlayerOverlay/PlayerOverlay'
import SlidesBot            from 'slides/lib/SlidesBot'
import style                from './Style'

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
            <div style={style.default}>
              <h1 style={style.text}>
                {this.state.slide.data}
              </h1>
            </div>
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
            <img
              src={this.state.slide.data}
              style={{width: "80%", height: "auto"}}
              alt=""
            />
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
            <h1 style={style.default}>
              {this.state.slide.data}
            </h1>
          </PlayerOverlay>
        )
      }
    }
  }
}

export default SlidesScene
