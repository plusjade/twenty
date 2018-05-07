import Crypto         from 'crypto'

const API_ENDPOINT = (
  process.env.NODE_ENV === 'production'
    ? "https://www.getdamon.com/videos"
    : "http://localhost:4000/videos"
)

const SEPARATOR = "_"

export const videoFind = (videoId) => {
  const string = window.localStorage.getItem(namespace(videoId))
  if (!string) { return }

  return JSON.parse(string)
}

export const videoRemove = (videoId) => {
  window.localStorage.removeItem(namespace(videoId))
}

export const videoSave = (videoId, data) => {
  const payload = JSON.stringify(data)
  window.localStorage.setItem(namespace(videoId), payload)
  console.log('🌽 video saved!', videoId)
}

export function findVideo(videoId) {
  return (
    window.fetch(buildUrl(videoId), {
      method: 'GET'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((rsp) => {
      const payload = JSON.parse(rsp.data.payload)
      return (
        Object.assign({}, rsp.data, {commands: payload.commands, mode: payload.mode})
      )
    })
    .catch((error) => {
      console.log('request failed', error)
    })
  )
}

export function listVideos() {
  return (
    window.fetch(API_ENDPOINT, {
      method: 'GET'
    })
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      console.log('request failed', error)
    })
  )
}

export function save(videoId, data) {
  const payload = JSON.stringify(data)
  window.localStorage.setItem(namespace(videoId), payload)

  persist({videoId, payload})
}

export function persist({videoId, payload, blob}) {
  const fdata = new FormData()
  if (payload) {
    fdata.append("payload", payload)
  }
  if (blob) {
    fdata.append("blob", blob)
  }

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
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function token() {
  return (
    Crypto
      .randomBytes(9)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  )
}

function parseJSON(response) {
  return response.json()
}

function namespace(id) {
  return `video${SEPARATOR}${id}`
}

function buildUrl(videoId) {
  return `${API_ENDPOINT}/${videoId}`
}
