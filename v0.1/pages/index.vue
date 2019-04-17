<template>
  <main>
    <h1>Prototype</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <button @click="toggleLiveInput()">
      {{ liveInputButton }}
    </button>

    <button @click="getDate()">{{ date }}</button>

    <audio @durationchange="showAudio" ref="player" controls >
        <!-- <source ref="player" :src="audioFile"> -->
        Your browser does not support the audio element.
    </audio>

    <metronome
      :tempo="bpm"
    />

    <tempo-select
      v-model="bpm"
    />

    <pitch-visualizer
      :pitch="pitch"
    />
  </main>
</template>

<script>
import pitchVisualizer from '../components/pitch-visualizer'
import metronome from '../components/metronome'
import tempoSelect from '../components/tempo-select'

import { autoCorrelate, getClosest } from '../lib'

export default {
  components: {
    pitchVisualizer,
    metronome,
    tempoSelect,
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
      animationFrameID: null,
      pitch: 0,
      bpm: 60,

      mediaRecorder: null,
      chunks: [],
      blob: null,
      audio: null,
      audioFile: null,
      isAudio: false,
      startRecord: null,
      stopRecord: null,
      recordLength: 0,

      date: 'Get the date',
      clicked: false,
      differenceInDate: 0,
      noteArray: [
        {times: 4, note: 'full'},
        {times: 3, note: 'half point'},
        {times: 2, note: 'half'},
        {times: 1.5, note: 'quater point'},
        {times: 1, note: 'quarter'},
        {times: .75, note: 'half point'},
        {times: .5, note: 'half'},
        {times: .25, note: 'eight'},
      ],
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

      this.mediaRecorder.stop()

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

      this.mediaRecorder = new MediaRecorder(stream)
      this.mediaRecorder.start()

      const date = new Date()
      this.startRecord = date.getTime()

      this.mediaRecorder.ondataavailable = evt => {
        // push each chunk (blobs) in an array
        this.chunks.push(evt.data)
      }

      this.mediaRecorder.onstop = evt => {
        // Make blob out of our blobs, and open it.
        console.log(this.chunks)
        this.blob = new Blob(this.chunks, { 'type' : 'audio/wav; codecs=opus' })
        this.audioFile = URL.createObjectURL(this.blob)
        this.$refs.player.src = this.audioFile
        const date = new Date()
        this.stopRecord = date.getTime()

        this.recordLength = this.recordLength + (this.stopRecord - this.startRecord)

        console.log(this.recordLength)
        console.log(this.$refs.player.buffered)
      }
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
    getDate () {
      const d = new Date()
      if (!this.clicked) {
        this.date = d.getTime()
        this.clicked = true
      } else {
        this.differenceInDate = d.getTime() - this.date
        this.clicked = false

        const noteValue = (this.differenceInDate / (60 / this.bpm)) / 1000
        console.log(getClosest(noteValue, this.noteArray))
      }
    },
    showAudio () {
      console.log(this.$refs.player.duration)
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
