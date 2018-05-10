import { API_ENDPOINT } from './config'

const toQueryString = (params) => (
  Object.keys(params)
    .filter(k => !!params[k])
    .map(k => window.encodeURIComponent(k) + '=' + window.encodeURIComponent(params[k]))
    .join('&')
)

export const buildUrl = (path, params) => {
  let queryString = ""
  if (params) {
    queryString = `?${toQueryString(params)}`
  }

  return (`${API_ENDPOINT}/v1${path}.json${queryString}`)
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

export const parseJSON = response => (response.json())
