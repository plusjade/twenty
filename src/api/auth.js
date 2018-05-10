import * as util from 'api/util'
import * as Storage from 'api/storage'
import { CLIENT_ID } from './config'

export const serverAuth = ({provider, token}) => {
  const HEADERS = {
    Authorization: `Bearer ${token}`
  }
  const fdata = new FormData()
  fdata.append('provider', provider)

  return (
    window.fetch(util.buildUrl("/users/auth"), {
      method: 'POST',
      body: fdata,
      headers: HEADERS,
    })
    .then(util.checkStatus)
    .then(util.parseJSON)
    .then((rsp) => {
      Object.keys(rsp.user).forEach((key) => {
        if (rsp.user[key]) {
          Storage.set(key, rsp.user[key])
        }
      })
      return rsp
    })
    .catch((error) => {
      console.log('request failed', error)
    })
  )
}

// returns a Promise with google token arg if signed in, null if not.
export const googleBootstrapSession = () => (
  new Promise((resolve, reject) => {
    const bodyNode = document.body || document.getElementsByTagName("body")[0]
    if (bodyNode) {
      const meta = document.createElement("meta")
      const z = document.createElement("script")

      meta.setAttribute("name", "google-signin-client_id")
      meta.setAttribute("content", CLIENT_ID)
      bodyNode.appendChild(meta)

      z.type = "text/javascript"
      z.async = true
      z.defer = true
      z.src = "https://apis.google.com/js/platform.js"
      z.onload = () => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: CLIENT_ID,
          }).then((authInstance) => {
            const isSignedIn = authInstance.isSignedIn.get()
            if (isSignedIn) {
              const token = authInstance.currentUser.get().getAuthResponse().id_token
              resolve(token)
            } else {
              resolve()
            }
          })
        })
      }
      bodyNode.appendChild(z)
    } else {
      reject()
    }
  })
)

export const renderGoogleSignIn = () => (
  new Promise((resolve, reject) => {
    window.gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      longtitle: true,
      theme: 'dark',
      onsuccess: (googleUser) => {
        const token = googleUser.getAuthResponse().id_token
        resolve(token)
      },
      onfailure: (error) => {
        console.log(error)
      },
    })
  })
)

export const googleSignOut = () => {
  const auth2 = window.gapi.auth2.getAuthInstance()
  return (
    auth2.signOut()
  )
}
