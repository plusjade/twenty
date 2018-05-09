import Radium               from 'radium'
import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import VideosList           from 'components/VideosList/VideosList'
import IconClose            from 'components/IconClose'
import withPromisedData     from 'containers/withPromisedData'
import style                from './Style'

const VideosListAsync = withPromisedData(VideosList, "videos")

class Library extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      entropyKey: Math.random()
    }
  }

  // easy way to trigger a fresh mount any time the library opens
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({entropyKey: Math.random()})
    }
  }

  render() {
    return(
      <div
        style={[
          style.wrap
        ]}
      >
        {false && (
          <div
            style={style.close}
            onClick={this.props.toggleLibrary}
          >
            <IconClose fill="#9E9E9E"/>
          </div>
        )}
        <VideosListAsync
          key={this.state.entropyKey}
          isOpen={this.props.isOpen}
        />
      </div>
    )
  }
}

export default Radium(Library)
