import React                from 'react'

import Library              from 'containers/Library'

const Home = (props) => {
  return(
    <Library
      isOpen={true}
      videosDB={props.videosDB}
    />
  )
}

export default Home
