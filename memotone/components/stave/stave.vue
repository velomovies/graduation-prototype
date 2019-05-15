<template>
  <div class="stave__notes">
    <div class="stave__time-signature"></div>
    <template
      v-for="(note, index) in notes"
    >
      <note
        v-if="note.noteDuration > 200"
        :key="index"
        :note="note"
        :noteIndex="index"
        :active="isPlaying && playingNote === index"
        @current-note="data => $emit('current-note', data)"
      />
    </template>
  </div>
</template>

<script>
import note from '../note'

export default {
  components: {
    note,
  },
  props: {
    notes: {
      type: Array,
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
      playingNote: 0,
    }
  },
  watch: {
    isPlaying: function () {
      this.playingNote = this.activeNote
      if (this.isPlaying) {
        this.setPlayingNote()
      }
    },
  },
  methods: {
    setPlayingNote () {
      setTimeout(() => {
        if (this.playingNote !== this.notes.length - 1) {
          this.playingNote = this.playingNote + 1
          this.setPlayingNote ()
        }
      }, this.notes[this.playingNote].noteDuration)
    },
  },
}
</script>


<style>
  .stave__notes {
    min-width: 100%;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    display: flex;
    background-image: url('/images/stave.svg');
    background-repeat: repeat-x;
    background-size: auto 100%;
    min-height: var(--stave-height);
  }

  .stave__time-signature {
    margin-left: calc(var(--stave-height) / 1.5);
    margin-right: calc(var(--stave-height) / 4);
    width: calc(var(--stave-height) / 2);
    background-image: url('/images/time-signature.svg');
    background-repeat: no-repeat;
  }
</style>
