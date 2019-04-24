<template>
  <section>
    <h2>{{ getNote() }}</h2>
    <p>frequency: {{ getFrequency() }} hz</p>
    <p>{{ getCents() }} cents</p>
    <p>Played note: {{ getPlayedNotes() }}</p>
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
    }
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
