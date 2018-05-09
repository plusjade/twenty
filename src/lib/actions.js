import Crypto from 'crypto'

const API_ENDPOINT = (
  process.env.NODE_ENV === 'production'
    ? "https://www.getdamon.com/videos"
    : "http://localhost:4000/videos"
)

const SEPARATOR = "_"

export const token = () => Crypto.randomBytes(6).toString('hex')

export const videosFind = videoId => (
  new Promise((resolve, reject) => {
    const string = window.localStorage.getItem(namespace(videoId))
    if (string) {
      resolve(JSON.parse(string))
    } else {
      videosFindDB(videoId).then(({payload}) => {
        resolve(payload)
      }).catch(() => {
        reject()
      })
    }
  })
)

export const videosSave = (videoId, data) => {
  if (!videoId) { throw new TypeError('videoId required') }

  const payload = JSON.stringify(data)
  window.localStorage.setItem(namespace(videoId), payload)
  videosSaveDB({videoId, payload})
  console.log('🌽 video saved!', videoId)
}

export const videosRemove = (videoId) => {
  if (!videoId) { throw new TypeError('videoId required') }

  window.localStorage.removeItem(namespace(videoId))
}

export const videosList = () => (
  Object.keys(window.localStorage)
    .filter(key => key.startsWith('video_'))
    .map(key => ({
      videoId: key.replace('video_', ''),
      created_at: ""
    }))
)

export const canEditVideo = videoId => (
  videoId && !!window.localStorage.getItem(namespace(videoId))
)

const videosFindDB = videoId => (
  window.fetch(buildUrl(videoId), {
    method: 'GET'
  })
  .then(checkStatus)
  .then(parseJSON)
  .then((rsp) => {
    const payload = JSON.parse(rsp.data.payload)
    return ({payload})
  })
  .catch((error) => {
    console.log('request failed', error)
  })
)

const videosSaveDB = ({videoId, payload, blob}) => {
  if (!videoId) { throw new TypeError('videoId required') }

  const fdata = new FormData()
  if (payload) {
    fdata.append("payload", payload)
  }
  if (blob) {
    fdata.append("blob", blob)
  }

  return (
    window.fetch(buildUrl(videoId), {
      method: 'PUT',
      body: fdata
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      console.log('request succeeded with JSON response', data)
    }).catch((error) => {
      console.log('request failed', error)
    })
  )
}

const videoListDB = () => (
  window.fetch(API_ENDPOINT, {
    method: 'GET'
  })
  .then(checkStatus)
  .then(parseJSON)
  .catch((error) => {
    console.log('request failed', error)
  })
)

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = response => response.json()

const namespace = id => `video${SEPARATOR}${id}`

const buildUrl = videoId => `${API_ENDPOINT}/${videoId}`
