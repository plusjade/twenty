import React, {PropTypes}   from 'react'
import VideosList           from './components/VideosList'
import StylesWrapper        from './styles/Wrapper'

const Home = React.createClass({
  componentWillMount() {
    this.props.toggleLibrary()
  },

  render() {
    return(
      <div id="library" style={StylesWrapper.library}>
      {this.props.videos && (
        <VideosList
          videos={this.props.videos}
          onSelect={(video) => {
            window.location = `/?id=${video.token}`
          }}
          isOpen={true}
        />
      )}
      </div>
    )
  }
})

export default Home
