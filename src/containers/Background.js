import Radium                   from 'radium'
import React, {PureComponent}   from 'react'
import PropTypes                from 'prop-types'
import Layer                    from 'components/Layer/Layer'
// import style                from './Style'

class Background extends PureComponent {
  static propTypes = {
    tween: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.timeline = this.props.tween(this.nodeContainer)
    this.timeline.pause()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying) {
      this.timeline.play()
    } else {
      this.timeline.pause()
    }
  }

  getRefContainer = (node) => {
    this.nodeContainer = node
  }

  render() {
    return (
      <Layer
        refCallback={this.getRefContainer}
        style={[{pointerEvents: "none"}, this.props.style]}
      >
        <div className="JADE"/>
      </Layer>
    )
  }
}

export default Radium(Background)
