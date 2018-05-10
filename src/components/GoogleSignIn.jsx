import React, { PureComponent } from 'react'
import Radium from 'radium'
import { renderGoogleSignIn } from 'api/auth'

class GoogleSignIn extends PureComponent {

  componentDidMount() {
    renderGoogleSignIn().then((token) => {
      if (token) {
        this.props.initializeWithGoogleToken(token)
      } else {
        // user did not complete Google login flow.
        // the Promise is left unresolved until they do.
      }
    })
  }

  render() {
    return (
      <div id="my-signin2">
        <div>
          {"+"}
        </div>
      </div>
    )
  }
}

export default Radium(GoogleSignIn)
