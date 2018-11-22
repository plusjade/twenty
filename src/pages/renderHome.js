import React from 'react'
import ReactDOM from 'react-dom'
import Home from 'components/Home'

const renderHome = () => {
  window.document.body.style.overflow = 'auto'
  ReactDOM.render(
    React.createElement(Home),
    window.document.getElementById('root')
  )
}

export default renderHome
