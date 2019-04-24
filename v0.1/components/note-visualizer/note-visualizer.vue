<template>
  <section>
    <h2
      v-for="(note, index) in notes"
      :key="index"
      @click="() => showNote(index)"
      :class="{
        'note-visualizer__active-note' :
        isPlaying && playingNote === index
      }"
    >
      {{ note.noteObj ? note.noteObj.noteName : 'rest' }}
    </h2>
    <span>{{ activeNote }}</span>
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
    isRecording: {
      type: Boolean,
      required: true,
    },
    isPlaying: {
      type: Boolean,
      required: true,
    },
    activeNote: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      firstLoopPlaying: true,
      startTime: null,
      stopTime: null,
      playedHz: [],
      notes: [],
      duration: 0,
      playingNote: 0,
    }
  },
  watch: {
    isRecording: function () {
      if (!this.isRecording) {
        this.stopTime = null
      }
    },
    isPlaying: function () {
      this.playingNote = this.activeNote
      if (this.isPlaying) {
        this.setPlayingNote()
      }
    },
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
            this.duration = this.duration + (this.startTime - this.stopTime)
          }

          this.firstLoopPlaying = false
        }
      } else {
        if (this.startTime && !this.firstLoopPlaying) {
          const date = new Date()
          this.stopTime = date.getTime()
          this.notes.push({
            hz: getMedian(this.playedHz),
            noteObj: musicalHelpers.getNoteObject(getMedian(this.playedHz)),
            timeStart: this.startTime,
            timeStop: this.stopTime,
            noteDuration: this.stopTime - this.startTime,
          })
          this.duration = this.duration + (this.stopTime - this.startTime)
          this.firstLoopPlaying = true
        }

        this.playedHz= []
      }
    },
  },
  methods: {
    showNote (index) {
      let noteTime = 0
      for (let i = 0; i < index; i++) {
        noteTime = noteTime + this.notes[i].noteDuration
      }
      this.$emit('current-note', { noteTime: noteTime / 1000, nthNote: index })
    },
    setPlayingNote () {
      setTimeout(() => {
        if (this.playingNote != this.notes.length - 1) {
          this.playingNote = this.playingNote + 1
          this.setPlayingNote ()
        }
      }, this.notes[this.playingNote].noteDuration)
    },
  },
}
</script>

<style>
  .note-visualizer__active-note {
    text-decoration: underline;
  }
</style>

