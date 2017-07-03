import React, {PropTypes}   from 'react'

import VideosDB             from '../lib/VideosDB'
import withPromisedData     from '../withPromisedData'

import VideosList           from '../components/VideosList'
import StylesWrapper        from '../styles/Wrapper'

const Videos = VideosDB()
const VideosListAsync = withPromisedData(VideosList, "videos")

const Library = React.createClass({
  propTypes: {
    onSelect: PropTypes.func,
    isOpen: PropTypes.bool,
  },

  getInitialState() {
    return ({
      // easy way to trigger a fresh mount
      entropyKey: Math.random()
    })
  },

  componentWillReceiveProps(nextProps) {
    // only when go from closed to open
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({entropyKey: Math.random()})
    }
  },

  render() {
    const defaultOnSelect = (video) => window.location = `/?id=${video.token}`

    return(
      <div style={StylesWrapper.library}>
        <VideosListAsync
          key={this.state.entropyKey}
          async={this.props.isOpen && Videos.list}
          onSelect={this.props.onSelect ? this.props.onSelect : defaultOnSelect}
          isOpen={this.props.isOpen}
        />
      </div>
    )
  }
})

export default Library
