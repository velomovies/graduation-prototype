<template>
  <section class="note-visualizer" ref="note-visualizer">
    <div class="note-visualizer__treble-staff"></div>
    <stave
      :notes="notes"
      :isPlaying="isPlaying"
      :activeNote="activeNote"
      @current-note="data => $emit('current-note', data)"
      @addedNote="scrollStave"
      @noteActive="scrollStave"
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
            this.addNotes({ isRest: true })
            this.duration = this.duration + (this.startTime - this.stopTime)
          }

          this.firstLoopPlaying = false
        }
      } else {
        if (this.startTime && !this.firstLoopPlaying) {
          const date = new Date()
          this.stopTime = date.getTime()
          this.addNotes({ isRest: false })
          this.duration = this.duration + (this.stopTime - this.startTime)
          this.firstLoopPlaying = true
        }

        this.playedHz= []
      }
    },
  },
  methods: {
    addNotes (options) {
      if (options.isRest) {
        this.notes.push({
          hz: 0,
          timeStart: this.stopTime,
          timeStop: this.startTime,
          noteDuration: this.startTime - this.stopTime,
        })
      } else {
        this.notes.push({
          hz: getMedian(this.playedHz),
          noteObj: musicalHelpers.getNoteObject(getMedian(this.playedHz)),
          timeStart: this.startTime,
          timeStop: this.stopTime,
          noteDuration: this.stopTime - this.startTime,
        })
      }
    },
    scrollStave (data) {
      this.$refs['note-visualizer'].scrollTo({
        top: 0,
        left: data,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style>
  .note-visualizer {
    position: relative;
    overflow-x: scroll;
    height: calc(var(--stave-height) * 4);
  }

  .note-visualizer::-webkit-scrollbar {
    width: 1rem;
    height: .3rem;
  }

  .note-visualizer::-webkit-scrollbar-track {
    display: none;
  }

  .note-visualizer::-webkit-scrollbar-thumb {
    height: .1rem;
    background-color: transparent;
  }

  .note-visualizer__treble-staff {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: calc(var(--stave-height) / 1.6);
    height: calc(var(--stave-height) * 3.5);
    background-image: url('/images/treble-staff.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
