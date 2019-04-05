<template>
  <main>
    <h1>Prototype</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <button @click="toggleLiveInput()">
      {{ liveInputButton }}
    </button>

    <pitch-visualizer
      :pitch="pitch"
    />
  </main>
</template>

<script>
import pitchVisualizer from '../components/pitch-visualizer'

import { autoCorrelate } from '../lib'

export default {
  components: {
    pitchVisualizer,
  },
  data() {
    return {
      audioContext: null,
      isListening: false,
      listeningStream: null,
      liveInputButton: 'Use live input',
      mediaStreamSource: null,
      errorMessage: '',
      bufferLength: 1024,
      audioBuffer: null,
      pitch: 0,
      animationFrameID: null,
    }
  },
  mounted() {
    this.checkPermissions()
  },
  methods: {
    toggleLiveInput () {
      if (this.isListening) {
        this.stopStream(this.listeningStream)
      } else {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(this.startStream)
          .catch(error => {
            this.checkPermissions()
            console.error('getUserMedia() error:', error)
          })
      }
    },
    startStream (stream) {
      this.isListening = true
      this.listeningStream = stream

      this.liveInputButton = 'Stop live input'

      this.processAudio(stream)
    },
    stopStream (stream) {
      this.isListening = false
      this.listeningStream = null

      this.liveInputButton = 'Use live input'
      this.pitch = 0

      const tracks = stream.getTracks()
      window.cancelAnimationFrame(this.animationFrameID)
      tracks.forEach(track => track.stop())
    },
    processAudio (stream) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.audioContext = new AudioContext()
      this.audioBuffer = new Float32Array(this.bufferLength)
      this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream)
      this.analyser = this.audioContext.createAnalyser()
      this.mediaStreamSource.connect(this.analyser)
      this.updatePitch()
    },
    updatePitch () {
      this.analyser.getFloatTimeDomainData(this.audioBuffer)
      const correlation = autoCorrelate(this.audioBuffer, this.audioContext.sampleRate)

      correlation > -1 ? this.pitch = correlation : this.pitch = 0

      this.animationFrameID = window.requestAnimationFrame(this.updatePitch)
    },
    checkPermissions () {
      navigator.permissions.query({name: 'microphone'})
        .then(permissionStatus => {
          if (permissionStatus.state === 'denied') {
            this.errorMessage = 'Give us permission to use your microphone'
          }
        })
    },
  },
}
</script>

<style>
button {
  font-size: 1rem;
  border: .1rem solid #000;
  padding: .75rem;
  cursor: pointer;
  transition: all .3s;
}

button:hover {
  background: #ededed;
}
</style>
