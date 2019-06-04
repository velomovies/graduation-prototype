<template>
  <div
    @click="() => showNote(noteIndex)"
    :class="[
      {
        'note--active' : active,
        'note' : note.noteObj,
        'rest' : !note.noteObj
      },
      noteLenghtClass,
      noteHeightClass
    ]"
  >
    <div
      class="note-active-container"
      :class="{ 'note-active-container--active' : active }"
      :style="`animation-duration: ${note.noteDuration / 1000}s;`"
    ></div>
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
  watch: {
    active: function () {
      if (this.active) {
        this.$emit('noteActive', this.$el.offsetLeft - 200)
      }
    },
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
    noteLenghtClass: function () {
      let noteClassName

      if (this.note.noteObj) {
        noteClassName = 'note--' + this.getNoteLength()

        if (this.note.noteObj.noteName.indexOf('5') === 1 ||
          this.note.noteObj.noteName.indexOf('6') === 1) {
          noteClassName += '-up'
        }
      } else {
        noteClassName = 'rest--' + this.getNoteLength()
      }
      return noteClassName
    },
    noteHeightClass: function () {
      let noteClassName

      if (this.note.noteObj) {
        noteClassName = `note--${this.note.noteObj.noteName}`
      }

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

  .note-active-container {
    position: absolute;
    left: 0;
    right: 100%;
    width: 0;
    height: 100%;
    border-radius: .3rem;
    background: var(--record-color);
    opacity: .5;
    z-index: var(--z-index-low);
  }

  .note-active-container--active {
    animation-name: in-out;
  }

  /* Notes */
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

  /* Rests */
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

  .note--C3, .note--C3-sharp {
    transform: translateY(calc(var(--stave-height) * 1.558));
  }
  .note--D3, .note--D3-sharp{
    transform: translateY(calc(var(--stave-height) * 1.45));
  }
  .note--E3 {
    transform: translateY(calc(var(--stave-height) * 1.315));
  }
  .note--F3, .note--F3-sharp {
    transform: translateY(calc(var(--stave-height) * 1.209));
  }
  .note--G3, .note--G3-sharp {
    transform: translateY(calc(var(--stave-height) * 1.073));
  }
  .note--A3, .note--A3-sharp {
    transform: translateY(calc(var(--stave-height) * .965));
  }
  .note--B3 {
    transform: translateY(calc(var(--stave-height) * .83));
  }

  .note--C4, .note--C4-sharp {
    transform: translateY(calc(var(--stave-height) * .724));
  }
  .note--D4, .note--D4-sharp {
    transform: translateY(calc(var(--stave-height) * .59));
  }
  .note--E4 {
    transform: translateY(calc(var(--stave-height) * .46));
  }
  .note--F4, .note--F4-sharp {
    transform: translateY(calc(var(--stave-height) * .35));
  }
  .note--G4, .note--G4-sharp {
    transform: translateY(calc(var(--stave-height) * .22));
  }
  .note--A4, .note--A4-sharp  {
    transform: translateY(calc(var(--stave-height) * .11));
  }
  .note--B4 {
    transform: translateY(calc(var(--stave-height) * 0));
  }

  .note--C5, .note--C5-sharp {
    transform: translateY(calc(var(--stave-height) * .28));
  }
  .note--D5, .note--D5-sharp {
    transform: translateY(calc(var(--stave-height) * .16));
  }
  .note--E5 {
    transform: translateY(calc(var(--stave-height) * .035));
  }
  .note--F5, .note--F5-sharp {
    transform: translateY(calc(var(--stave-height) * -.09));
  }
  .note--G5, .note--G5-sharp {
    transform: translateY(calc(var(--stave-height) * -.21));
  }
  .note--A5, .note--A5-sharp {
    transform: translateY(calc(var(--stave-height) * -.336));
  }
  .note--B5 {
    transform: translateY(calc(var(--stave-height) * -.455));
  }

  .note--C6, .note--C6-sharp {
    transform: translateY(calc(var(--stave-height) *  -.577));
  }
  .note--D6, .note--D6-sharp {
    transform: translateY(calc(var(--stave-height) *  -.697));
  }
  .note--E6 {
    transform: translateY(calc(var(--stave-height) *  -.82));
  }
  .note--F6, .note--F6-sharp {
    transform: translateY(calc(var(--stave-height) *  -.939));
  }
  .note--G6, .note--G6-sharp {
    transform: translateY(calc(var(--stave-height) *  -1.064));
  }
  .note--A6, .note--A6-sharp {
    transform: translateY(calc(var(--stave-height) *  -1.181));
  }
  .note--B6 {
    transform: translateY(calc(var(--stave-height) *  -1.3));
  }

  .note--C3::after,
  .note--C3-sharp::after,
  .note--D3::after,
  .note--D3-sharp::after,
  .note--E3::after,
  .note--F3::after,
  .note--F3-sharp::after,
  .note--G3::after,
  .note--G3-sharp::after,
  .note--A3::after,
  .note--A3-sharp::after,
  .note--B3::after,
  .note--C4::after,
  .note--C4-sharp::after,
  .note--A5::after,
  .note--A5-sharp::after,
  .note--B5::after,
  .note--C6::after,
  .note--C6-sharp::after,
  .note--D6::after,
  .note--D6-sharp::after,
  .note--E6::after,
  .note--F6::after,
  .note--F6-sharp::after,
  .note--G6::after,
  .note--G6-sharp::after,
  .note--A6::after,
  .note--A6-sharp::after,
  .note--B6::after {
    content: '';
    position: absolute;
    left:  calc(var(--stave-height) / -11);
    width: calc(var(--stave-height) / 2.5);
    height: var(--stave-height);
    background-image: url('/images/stave.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .note--A5::after,
  .note--A5-sharp::after,
  .note--C6::after,
  .note--C6-sharp::after,
  .note--E6::after,
  .note--G6::after,
  .note--G6-sharp::after,
  .note--B6::after {
    top: calc(var(--stave-height) / 11);
  }

  .note--B5::after,
  .note--D6::after,
  .note--D6-sharp::after,
  .note--F6::after,
  .note--F6-sharp::after,
  .note--A6::after,
  .note--A6-sharp::after  {
    top: calc(var(--stave-height) / 4.75);
  }

  .note--C3::after,
  .note--C3-sharp::after,
  .note--E3::after,
  .note--G3::after,
  .note--G3-sharp::after,
  .note--B3::after {
    top: calc(var(--stave-height) * -.59);
  }

  .note--C4::after,
  .note--C4-sharp::after,
  .note--A3::after,
  .note--A3-sharp::after,
  .note--F3::after,
  .note--F3-sharp::after,
  .note--D3::after,
  .note--D3-sharp::after {
    top: calc(var(--stave-height) * -.48);
  }

  .note--C3-sharp::before,
  .note--D3-sharp::before,
  .note--F3-sharp::before,
  .note--G3-sharp::before,
  .note--A3-sharp::before,
  .note--C4-sharp::before,
  .note--D4-sharp::before,
  .note--F4-sharp::before,
  .note--G4-sharp::before,
  .note--A4-sharp::before {
    content: '';
    position: absolute;
    background-image: url('/images/notes/sharp.svg');
    background-repeat: no-repeat;
    top: calc(var(--stave-height) / 3.5);
    left: calc(var(--stave-height) / -6);
    width: calc(var(--stave-height) / 6);
    height: calc(var(--stave-height) / 2);
  }

  .note--C5-sharp::before,
  .note--D5-sharp::before,
  .note--F5-sharp::before,
  .note--G5-sharp::before,
  .note--A5-sharp::before,
  .note--C6-sharp::before,
  .note--D6-sharp::before,
  .note--F6-sharp::before,
  .note--G6-sharp::before,
  .note--A6-sharp::before {
    content: '';
    position: absolute;
    background-image: url('/images/notes/sharp.svg');
    background-repeat: no-repeat;
    top: calc(var(--stave-height) * -.1);
    left: calc(var(--stave-height) / -6);
    width: calc(var(--stave-height) / 6);
    height: calc(var(--stave-height) / 2);
  }
</style>
