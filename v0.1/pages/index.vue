<template>
  <main>
    <h1>Prototype</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <button @click="toggleLiveInput">
      {{ liveInputButton }}
    </button>

    <button @click="getDate()">{{ date }}</button>

    <button
      v-if="!isListening && audioFile"
      @click="() => toggleAudio({ noteTime: 0, nthNote: 0 })"
    >
      {{ playButton }}
    </button>

    <metronome
      :tempo="bpm"
    />

    <tempo-select
      v-model="bpm"
    />

    <pitch-visualizer
      :pitch="pitch"
    />

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
import pitchVisualizer from '../components/pitch-visualizer'
import metronome from '../components/metronome'
import noteVisualizer from '../components/note-visualizer'
import tempoSelect from '../components/tempo-select'

import { autoCorrelate, getClosest } from '../lib'

export default {
  components: {
    pitchVisualizer,
    metronome,
    noteVisualizer,
    tempoSelect,
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
      bpm: 60,

      mediaRecorder: null,
      chunks: [],
      blob: null,
      audioFile: null,
      player: null,
      isRecording: false,

      isPlaying: false,
      playButton: 'Play audio',
      activeNote: 0,

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
    console.log(localStorage['icon'])
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
        this.saveAudio()
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
    saveAudio () {
      this.player = new Audio()
      this.blob = new Blob(this.chunks, { 'type' : 'audio/wav; codecs=opus' })
      this.audioFile = URL.createObjectURL(this.blob)

      var xhr = new XMLHttpRequest();
      xhr.open('GET',
      this.audioFile,
      true)
      xhr.responseType = "blob";
      console.log(xhr)
      xhr.onload = function(e){ //Stringify blob...
        //reload the icon from storage
        var fr = new FileReader();
        fr.onload =
            function(e) {
                localStorage['icon'] = e.target.result
                console.log(localStorage['icon'])
            }
        fr.readAsDataURL(xhr.response);
      }
      xhr.send(null)
      this.player.src = this.audioFile

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
