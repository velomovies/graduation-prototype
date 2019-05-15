<template>
  <div class="record">
    <header>
      <app-logo
        isBack
        isLite
      />
      <app-error v-if="errorMessage"/>
      <label>Title: <input type="text"></label>
    </header>
    <main>
      <note-visualizer
        :pitch="pitch"
        :activeNote="activeNote"
        :isPlaying="isPlaying"
        :isRecording="isRecording"
        @current-note="toggleAudio"
      />

      <record-controls
        @toggleAudio="() => toggleAudio({ noteTime: 0, nthNote: 0 })"
        @toggleInput="toggleLiveInput"
        :isListening="isListening"
        :audioFile="audioFile"
        :isPlaying="isPlaying"
      />
    </main>
  </div>
</template>

<script>
import appLogo from '../components/app-logo'
import appError from '../components/app-error'
import noteVisualizer from '../components/note-visualizer'
import recordControls from '../components/record-controls'

import { autoCorrelate } from '../lib'

export default {
  components: {
    appError,
    appLogo,
    noteVisualizer,
    recordControls,
  },
  data() {
    return {
      errorMessage: false,

      audioContext: null,
      isListening: false,
      listeningStream: null,
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
  },
  beforeDestroy() {
    this.stopRecording()
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

      this.processAudio(stream)
    },
    stopStream (stream) {
      this.isListening = false
      this.listeningStream = null

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
      if(this.mediaRecorder) {
        if(this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop()
        }
      }
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
            this.errorMessage = true
          } else {
            this.toggleLiveInput()
          }
        })
    },
  },
}
</script>

<style>
.record {
  background: var(--theme-color);
  height: 100%;
  min-height: 100vh;
}
</style>
