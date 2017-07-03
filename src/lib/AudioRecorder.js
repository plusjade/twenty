import RecordRTC            from 'recordrtc'

const AudioRecorder = () => {
  let recorder = undefined
  let blob = undefined

  function bootstrap(callback) {
    window.navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      const StereoAudioRecorder = RecordRTC.StereoAudioRecorder
      recorder = new StereoAudioRecorder(stream, {})
      if (typeof callback === "function") {
        callback(true)
      }
    }).catch((e) => {
      if (typeof callback === "function") {
        callback(false)
      }
      console.log(e)
      alert("Audio recorder failed to load =/")
    })
  }

  function record() {
    if (!isRecorderLoaded()) { return }

    if (recorder.recordingLength > 0) {
      recorder.resume()
    } else {
      recorder.record()
    }
  }

  function pause() {
    if (!isRecorderLoaded()) { return }
    recorder.pause()
  }


  function finish(callback) {
    if (!isRecorderLoaded()) { return }
    recorder.stop((blob) => {
      blob = blob
      callback(blob, getSource())
    })
  }

  function getSource() {
    if (blob) {
      return URL.createObjectURL(blob)
    } else {
      return undefined
    }
  }

  function isRecorderLoaded() {
    if (!recorder) {
      console.warn("recorder is not loaded")
    }

    return !!recorder
  }

  return ({
    bootstrap: bootstrap,
    finish: finish,
    pause: pause,
    record: record,
  })
}

export default AudioRecorder
