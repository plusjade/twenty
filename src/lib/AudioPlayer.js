import {Howl}               from 'howler'

const AudioPlayer = () => {
  let sound = undefined

  function mount(url, callback) {
    if  (typeof callback !== "function") {
      callback = function () {}
    }

    if (url) {
      sound = new Howl({src: [url], preload: true})
      if (sound.state() === "loaded") {
        callback()
      } else {
        sound.on("load", callback)
      }
    } else {
      sound = undefined
      callback()
    }
  }

  function pause() {
    sound && sound.pause()
  }

  function play() {
    sound && sound.play()
  }

  function seek(seconds) {
    sound && sound.seek(seconds)
  }

  function stop() {
    sound && sound.stop()
  }

  return ({
    mount: mount,
    pause: pause,
    play: play,
    seek: seek,
    stop: stop,
  })
}

export default AudioPlayer
