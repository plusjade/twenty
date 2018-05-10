import React from 'react'
import ReactDOM from 'react-dom'
import Home from 'containers/Home'

const renderHome = () => {
  window.document.body.style.overflow = 'auto'
  ReactDOM.render(
    <Home />,
    window.document.getElementById('root')
  )
}

export default renderHome
