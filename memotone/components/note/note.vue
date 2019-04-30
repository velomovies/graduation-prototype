<template>
  <div
    @click="() => showNote(noteIndex)"
    :class="[{ 'note--active' : active, 'note' : note.noteObj, 'rest' : !note.noteObj }, noteClass]"
  >
  </div>
</template>

<script>
import { getClosest } from '../../lib'

export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    noteIndex: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      noteArray: [
        {times: 4, note: 'full'},
        {times: 3, note: 'half-point'},
        {times: 2, note: 'half'},
        {times: 1.5, note: 'quarter-point'},
        {times: 1, note: 'quarter'},
        {times: .75, note: 'eight-point'},
        {times: .5, note: 'eight'},
        {times: .25, note: 'sixteen'},
      ],
    }
  },
  methods: {
    showNote (index) {
      let noteTime = 0
      for (let i = 0; i < index; i++) {
        noteTime = noteTime + this.note.noteDuration
      }
      this.$emit('current-note', { noteTime: noteTime / 1000, nthNote: index })
    },
    getNoteLength () {
      const noteValue = (this.note.noteDuration / (60 / this.$store.state.bpm)) / 1000
      let noteLength

      this.noteArray.forEach(item => {
        if (item.times === getClosest(noteValue, this.noteArray)) {
          noteLength = item.note
        }
      })
      return noteLength
    },
  },
  computed: {
    noteClass: function () {
      let noteClassName

      this.note.noteObj ? noteClassName = 'note--' : noteClassName = 'rest--'
      noteClassName += this.getNoteLength()

      return noteClassName
    },
  },
}
</script>

<style>
  :root {
    /* Keep the aspect-ratio of 0.6 : 1 (width 300 x height 500) */
    --rest-width: calc(var(--stave-height) / 2.5);
    --rest-height: calc(var(--rest-width) / .6);

    --note-width: calc(var(--stave-height) / 2.7);
    --note-height: calc(var(--note-width) / .6);
  }

  .note, .rest {
    flex-shrink: 0;
    background-repeat: no-repeat;
    margin-right: calc(var(--stave-height) * .2);
  }

  .note {
    width: var(--note-width);
    height: var(--note-height);
  }

  .rest {
    width: var(--rest-width);
    height: var(--rest-height);
    transform: translateY(calc(var(--stave-height) * .18));
  }

  .note--active {
    color: red;
    opacity: .8;
  }

  .note--full {
    background-image: url('/images/notes/note-full.svg');
  }
  .note--full-up {
    background-image: url('/images/notes/note-full.svg');
  }
  .note--half {
    background-image: url('/images/notes/note-half.svg');
  }
  .note--half-up {
    background-image: url('/images/notes/note-half-up.svg');
  }
  .note--half-point {
    background-image: url('/images/notes/note-half-point.svg');
  }
  .note--half-point-up {
    background-image: url('/images/notes/note-half-point-up.svg');
  }
  .note--quarter {
    background-image: url('/images/notes/note-quarter.svg');
  }
  .note--quarter-up {
    background-image: url('/images/notes/note-quarter-up.svg');
  }
  .note--quarter-point {
    background-image: url('/images/notes/note-quarter-point.svg');
  }
  .note--quarter-point-up {
    background-image: url('/images/notes/note-quarter-point-up.svg');
  }
  .note--eight {
    background-image: url('/images/notes/note-eight.svg');
  }
  .note--eight-up {
    background-image: url('/images/notes/note-eight-up.svg');
  }
  .note--eight-point {
    background-image: url('/images/notes/note-eight-point.svg');
  }
  .note--eight-point-up {
    background-image: url('/images/notes/note-eight-point-up.svg');
  }
  .note--sixteen {
    background-image: url('/images/notes/note-sixteen.svg');
  }
  .note--sixteen-up {
    background-image: url('/images/notes/note-sixteen-up.svg');
  }

  .rest--full {
    background-image: url('/images/notes/rest-full.svg');
    margin: 0 calc(var(--stave-height) * .4) 0 calc(var(--stave-height) * .3);
  }
  .rest--half {
    background-image: url('/images/notes/rest-half.svg');
    margin-right: calc(var(--stave-height) * .4);
  }
  .rest--half-point {
    background-image: url('/images/notes/rest-half-point.svg');
    width: calc(2 * var(--rest-width))
  }
  .rest--quarter {
    background-image: url('/images/notes/rest-quarter.svg');
  }
  .rest--quarter-point {
    background-image: url('/images/notes/rest-quarter-point.svg');
    width: calc(2 * var(--rest-width))
  }
  .rest--eight {
    background-image: url('/images/notes/rest-eight.svg');
  }
  .rest--eight-point {
    background-image: url('/images/notes/rest-eight-point.svg');
    width: calc(2 * var(--rest-width))
  }
  .rest--sixteen {
    background-image: url('/images/notes/rest-sixteen.svg');
  }
</style>

