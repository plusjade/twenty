
export const get = (key) => {
  if (window.localStorage) {
    return window.localStorage.getItem(key)
  } else {
    return undefined
  }
}

export const set = (key, value) => {
  if (window.localStorage) {
    return window.localStorage.setItem(key, value)
  } else {
    return undefined
  }
}
