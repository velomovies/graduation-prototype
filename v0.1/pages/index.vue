<template>
  <main>
    <h1>Prototype</h1>

    <button @click="toggleLiveInput()">
      {{ liveInputButton }}
    </button>

    <h2>{{ note }}</h2>
    <p>Played note: {{ playedNote }}</p>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </main>
</template>

<script>
import { autoCorrelate, pitchToNotes, getMedian } from '../lib'

export default {
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
      pitch: null,
      note: '--',
      playedNote: '',
      noteStrings: [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
      ],

      animationFrameID: null,

      noteObj: {},
      nextArray: true,
      count: 0,

      // sourceNode: null,
      // delayNode: null,
      // analyser: null,
      // gainNode: null,
      // isPlaying: false,
      // tracks: null,

      // playedNote: '',
      // pitchElem: '--',
      // noteElem: '--',
      // detuneAmount: '--',
      // detectorElemClass: 'vague',
      // detuneElemClass: '',
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
      this.liveInputButton = 'Use live input'
      this.pitch = null
      this.note = '--'
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

      if (correlation > -1) {
        this.pitch = correlation
        const playedNote = pitchToNotes(this.pitch)
        this.note = this.noteStrings[playedNote % 12]

        this.noteObj['array' + this.count].push(this.pitch)
        this.nextArray = true

      } else {
        this.pitch = null
        this.note = '--'

        if (this.nextArray) {
          if (this.noteObj['array' + this.count]) {
            const valuesArray = this.noteObj['array' + this.count]
            const median = getMedian(valuesArray)
            const note = pitchToNotes(median)
            this.playedNote += `${this.noteStrings[note % 12]} `
          }
          this.count = this.count + 1
          this.noteObj['array' + this.count] = []
          this.nextArray = false
        }

      }
      this.animationFrameID = window.requestAnimationFrame(this.updatePitch)
    },
    checkPermissions() {
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
