<template>
  <section>
    <h2>{{ getNote() }}</h2>
    <p>frequency: {{ getFrequency() }} hz</p>
    <p>{{ getCents() }} cents</p>
    <p>Played note: {{ getPlayedNotes() }}</p>
    <pre>{{ notes }}</pre>
  </section>
</template>

<script>
import { musicalHelpers, getMedian } from '../../lib'

export default {
  props: {
    pitch: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      noteNumber: '--',
      note: '--',
      playedNote: '',
      detune: null,
      absDetune: null,

      noteStrings: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
      noteObj: {},
      count: 0,
      nextArray: true,

      firstLoopPlaying: true,
      startTime: null,
      stopTime: null,
      playedHz: [],
      notes: [],
    }
  },
  watch: {
    pitch: function () {
      if (this.pitch) {
        this.playedHz.push(this.pitch)

        if (this.firstLoopPlaying) {
          const date = new Date()
          this.startTime = date.getTime()

          if (this.stopTime) {
            this.notes.push({
              hz: 0,
              timeStart: this.stopTime,
              timeStop: this.startTime,
              noteDuration: this.startTime - this.stopTime,
            })
          }

          this.firstLoopPlaying = false
        }
      } else {
        if (this.startTime && !this.firstLoopPlaying) {
          const date = new Date()
          this.stopTime = date.getTime()
          this.notes.push({
            hz: getMedian(this.playedHz),
            noteObj: musicalHelpers.getNoteObject(getMedian(this.playedHz), 4),
            timeStart: this.startTime,
            timeStop: this.stopTime,
            noteDuration: this.stopTime - this.startTime,
          })
          this.firstLoopPlaying = true
        }

        this.playedHz= []
      }
    },
  },
  methods: {
    getNote () {
      this.noteNumber = musicalHelpers.noteFromPitch(this.pitch)
      this.note = this.noteStrings[this.noteNumber % 12]

      return this.pitch ? this.note : '--'
    },
    getFrequency () {
      this.frequency = Math.round(this.pitch)

      return this.pitch ? this.frequency : '--'
    },
    getCents () {
      this.detune = musicalHelpers.centsOffFromPitch(this.pitch, this.noteNumber)
      this.absDetune = Math.abs(this.detune)

      if (this.detune == 0) {
        return '--'
      } else if (this.detune < 0) {
        return `${this.absDetune} ♭`
      } else if (this.detune > 0) {
        return `${this.absDetune} ♯`
      } else {
        return '--'
      }
    },
    getPlayedNotes () {
      if (this.pitch) {
        this.noteObj[`array-${this.count}`].push(this.pitch)
        this.nextArray = true
      } else if (!this.pitch && this.nextArray) {
        if (this.noteObj[`array-${this.count}`]) {
          const pitchMedian = getMedian(this.noteObj[`array-${this.count}`])
          const noteMedian = musicalHelpers.noteFromPitch(pitchMedian)
          this.playedNote += `${this.noteStrings[noteMedian % 12]} `
        }
        this.count = this.count + 1
        this.noteObj[`array-${this.count}`] = []
        this.nextArray = false
      }
      return this.playedNote
    },
  },
}
</script>
