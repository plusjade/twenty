import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import VideosList           from 'components/VideosList'
import withPromisedData     from 'containers/withPromisedData'
import StylesWrapper        from 'styles/Wrapper'

const VideosListAsync = withPromisedData(VideosList, "videos")

class Library extends Component {
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
      <div style={StylesWrapper.library}>
        <VideosListAsync
          key={this.state.entropyKey}
          async={this.props.isOpen ? this.props.videosDB.list : undefined}
          onSelect={this.props.onSelect}
          isOpen={this.props.isOpen}
        />
      </div>
    )
  }
}

Library.propTypes = {
  onSelect: PropTypes.func,
  isOpen: PropTypes.bool,
  videosDB: PropTypes.object.isRequired,
}

Library.defaultProps = {
 onSelect: (video) => window.location = `/?id=${video.token}`
}

export default Library
