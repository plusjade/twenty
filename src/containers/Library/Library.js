import Radium               from 'radium'
import React, {Component}   from 'react'
import PropTypes            from 'prop-types'

import { listVideos }       from 'lib/actions'
import VideosList           from 'components/VideosList/VideosList'
import IconClose            from 'components/IconClose'
import withPromisedData     from 'containers/withPromisedData'
import style                from './Style'

const VideosListAsync = withPromisedData(VideosList, "videos")

class Library extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    isOpen: PropTypes.bool,
  }

  static defaultProps = {
    onSelect: video => window.location = `/?id=${video.token}`,
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
      <div style={[
        style.wrap,
        {maxHeight: this.props.libraryDistance}
      ]}>
      {this.props.isOpen && !this.props.disableClose && (
        <div
          style={style.close}
          onClick={this.props.toggleLibrary}
        >
          <IconClose fill="#9E9E9E"/>
        </div>
      )}
        <VideosListAsync
          key={this.state.entropyKey}
          async={true ? listVideos : undefined}
          onSelect={this.props.onSelect}
          isOpen={this.props.isOpen}
          libraryDistance={this.props.libraryDistance}
        />
      </div>
    )
  }
}

export default Radium(Library)
