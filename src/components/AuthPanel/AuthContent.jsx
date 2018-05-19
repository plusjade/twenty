import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import { setCookie, getCookie, destroyCookie } from 'vendor/cookies'
import {
  serverAuth,
  googleBootstrapSession,
  googleSignOut,
} from 'api/auth'
import GoogleSignIn from 'components/GoogleSignIn'
import style from './style'

class AuthContent extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    toggleActive: PropTypes.func.isRequired,
  }

  state = {
    isLoaded: false
  }

  componentDidMount() {
    const access_token = getCookie('access_token')
    if (access_token) {
      // verify the stored server token is good
      // provider 'pb' just means from the server (positive buddy)
      serverAuth({provider: "pb", token: access_token}).then((rsp) => {
        if (rsp) {
          // YAY the session is valid do some stuff
          this.setState({isAuthenticated: true})
        } else {
          // the token is no good so remove it
          destroyCookie('access_token')
        }
        this.bootstrapClientSession()
      })
    } else {
      this.bootstrapClientSession()
    }
  }

  // The client does not have a server token,
  // so bootstrap client session workflow, in this case Google Signin.
  // The workflow generates a client token that the server can verify
  // and send back a server token.
  bootstrapClientSession = () => {
    googleBootstrapSession().then((token) => {
      this.setState({isLoaded: true})
      // previous Google permissions have been found
      if (token) {
        this.initializeWithGoogleToken(token)
      } else {
        console.log('no token found')
        // user has not granted Google permissions
      }
    })
  }

  // Once we get a client token, send it to the server for verification.
  // Return server access token on success.
  initializeWithGoogleToken = (token) => {
    serverAuth({provider: "google", token}).then((rsp) => {
      if (rsp) {
        const THIRTY_DAYS =  30 * 24 * 60
        console.log("auth Success")
        this.setState({isAuthenticated: true})
        setCookie('access_token', rsp.access_token, THIRTY_DAYS)
        this.props.toggleActive()
      } else {
        console.log("fail auth")
      }
    })
  }

  handleLogOut = (e) => {
    e.preventDefault()
    googleSignOut().then(() => {
      destroyCookie('access_token')
      window.location.href = "/"
    })
  }

  render() {
    return (
      <div
        style={[
          style.authContent,
          this.props.isActive && style.isActive
        ]}
      >
        <div style={style.inner}>
          {this.state.isLoaded && (
            <GoogleSignIn
              initializeWithGoogleToken={this.initializeWithGoogleToken}
            />
          )}
          {this.state.isLoaded && this.state.isAuthenticated && (
            <button
              onClick={this.handleLogOut}
              style={style.logOut}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default Radium(AuthContent)
