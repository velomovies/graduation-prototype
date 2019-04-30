<template>
  <section class="note-visualizer">
    <stave
      :notes="notes"
      :isPlaying="isPlaying"
      :activeNote="activeNote"
      @current-note="data => $emit('current-note', data)"
    />
  </section>
</template>

<script>
import stave from '../stave'

import { musicalHelpers, getMedian } from '../../lib'

export default {
  components: {
    stave,
  },
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
    }
  },
  watch: {
    isRecording: function () {
      if (!this.isRecording) {
        this.stopTime = null
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
}
</script>

<style>
  .note-visualizer {
    position: relative;
    overflow-x: scroll;
    height: 30rem;
  }
</style>
