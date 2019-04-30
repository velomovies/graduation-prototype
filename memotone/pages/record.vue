<template>
  <main>
    <h1>Record Page</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <button
      v-if="!isListening && audioFile"
      @click="() => toggleAudio({ noteTime: 0, nthNote: 0 })"
    >
      {{ playButton }}
    </button>

    <button @click="toggleLiveInput">
      {{ liveInputButton }}
    </button>

    <nuxt-link to="/">Verwijder</nuxt-link>
    <span @click="saveMusic">
      <nuxt-link to="/music/iets">Opslaan</nuxt-link>
    </span>

    <note-visualizer
      :pitch="pitch"
      :activeNote="activeNote"
      :isPlaying="isPlaying"
      :isRecording="isRecording"
      @current-note="toggleAudio"
    />
  </main>
</template>

<script>
import metronome from '../components/metronome'
import noteVisualizer from '../components/note-visualizer'
import tempoSelect from '../components/tempo-select'

import { autoCorrelate } from '../lib'

export default {
  components: {
    noteVisualizer,
  },
  data() {
    return {
      errorMessage: '',

      audioContext: null,
      isListening: false,
      listeningStream: null,
      liveInputButton: 'Use live input',
      mediaStreamSource: null,
      bufferLength: 1024,
      audioBuffer: null,
      animationFrameID: null,
      pitch: 0,

      mediaRecorder: null,
      chunks: [],
      blob: null,
      audioFile: null,
      player: null,
      isRecording: false,

      isPlaying: false,
      playButton: 'Play audio',
      activeNote: 0,
}
  },
  mounted() {
    this.checkPermissions()
    console.log()
  },
  methods: {
    toggleLiveInput () {
      if (this.isListening) {
        this.stopStream(this.listeningStream)
        this.stopRecording()
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
      tracks.forEach(track => track.stop())
      window.cancelAnimationFrame(this.animationFrameID)
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
    startRecording () {
      this.mediaRecorder = new MediaRecorder(this.listeningStream)
      this.mediaRecorder.start()
      this.isRecording = true

      this.mediaRecorder.ondataavailable = e => {
        this.chunks.push(e.data)
      }

      this.mediaRecorder.onstop = () => {
        this.saveRecording()
      }
    },
    stopRecording () {
      this.mediaRecorder.stop()
      this.isRecording = false
    },
    updatePitch () {
      this.analyser.getFloatTimeDomainData(this.audioBuffer)
      const correlation = autoCorrelate(this.audioBuffer, this.audioContext.sampleRate)

      correlation > -1 ? this.pitch = correlation : this.pitch = 0

      if (this.pitch && !this.isRecording) {
        this.startRecording()
      }

      this.animationFrameID = window.requestAnimationFrame(this.updatePitch)
    },
    saveRecording () {
      this.player = new Audio()
      this.blob = new Blob(this.chunks, { 'type' : 'audio/wav; codecs=opus' })
      this.audioFile = URL.createObjectURL(this.blob)
      this.player.src = this.audioFile
    },
    saveMusic () {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.audioFile, true)
      xhr.responseType = "blob";
      xhr.onload = function (e) { //Stringify blob...
        //reload the icon from storage
        var fr = new FileReader();
        fr.onload =
          function(e) {
            const musicFile = {
              musicName: this.$store.state.musicName,
              length: 1000,
              notes: [{ hz: 12340 }],
              instrument: 'trompet',
              audioFile: e.target.result,
              bpm: this.$store.state.bpm,
            }
            localStorage['icon'] = JSON.stringify(musicFile)
          }
        fr.readAsDataURL(xhr.response);
      }
      xhr.send(null)
    },
    toggleAudio (data) {
      console.log(data)
      if (this.isPlaying) {
        this.isPlaying = false
        this.activeNote = 0
        this.playButton = 'Play audio'
        this.player.pause()
      } else {
        this.isPlaying = true
        this.activeNote = data.nthNote
        this.playButton = 'Pause audio'
        this.player.currentTime = data.noteTime
        this.player.play()
      }
    },
    checkPermissions () {
      navigator.permissions.query({name: 'microphone'})
        .then(permissionStatus => {
          if (permissionStatus.state === 'denied') {
            this.errorMessage = 'Give us permission to use your microphone'
          } else {
            this.toggleLiveInput()
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
