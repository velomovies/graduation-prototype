<template>
    <section
      class="settings-tab"
      :class="{ 'settings-tab--open' : editOpen }"
    >
      <h1 v-if="!editOpen" class="settings-tab__text-h1">
        {{ musicTitle }}
      </h1>
      <input
        v-if="editOpen"
        :disabled="!editOpen"
        class="settings-tab__text-h1"
        :class="{ 'settings-tab__text-h1--open' : editOpen }"
        type="text"
        :value="musicTitle"
        @change="changeTitle"
      >
      <div
        class="settings-tab__text-instrument"
        :class="{
          'settings-tab__text-instrument--open' : editOpen,
          'settings-tab__text-instrument--small' : selectedInstrument == 0,
        }"
      >
        <select
          class="settings-tab__text-instrument-input"
          :disabled="!editOpen"
          :value="selectedInstrument"
          @change="changeInstrument"
        >
          <option value="0">Zang</option>
          <option value="1">Instrument in C</option>
          <option value="2">Instrument in D</option>
          <option value="3">Instrument in Es</option>
          <option value="4">Instrument in F</option>
          <option value="5">Instrument in G</option>
          <option value="6">Instrument in A</option>
          <option value="7">Instrument in Bes</option>
        </select>
      </div>

      <label
        class="settings-tab__text-tempo meta"
      >
        Tempo:
        <input
          class="settings-tab__text-tempo-input"
          :class="{ 'settings-tab__text-tempo-input--open' : editOpen }"
          :disabled="!editOpen"
          type="number"
          value="90"
          max="160"
          min="20"
          >
            bpm
          </label>
      <div class="settings-tab__buttons">
        <transition name="fade">
          <button v-if="editOpen" @click="editClose" class="settings-tab__button">
            <close-icon class="settings-tab__button-icon" />
            <p class="a11y-sr-only">Sluit</p>
          </button>
        </transition>

        <button @click="editToggle" class="settings-tab__button">
          <edit-icon v-if="!editOpen" class="settings-tab__button-icon" />
          <save-icon v-if="editOpen" class="settings-tab__button-icon" />
          <p class="a11y-sr-only">{{ buttonText }}</p>
        </button>
      </div>
    </section>
</template>

<script>
import closeIcon from '../../static/images/icons/x.svg'
import editIcon from '../../static/images/icons/edit-3.svg'
import saveIcon from '../../static/images/icons/save.svg'

export default {
  components: {
    closeIcon,
    editIcon,
    saveIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      editOpen: false,
      musicTitleChanged: '',
      musicInstrumentChanged: -1,
    }
  },
  methods: {
    editClose () {
      this.musicTitleChanged = this.title
      this.editOpen = false
      this.$emit('toggleEdit', this.editOpen)
    },
    editToggle () {
      this.editOpen = !this.editOpen
      this.$emit('toggleEdit', this.editOpen)
    },
    changeTitle (e) {
      this.musicTitleChanged = e.target.value
    },
    changeInstrument (e) {
      this.musicInstrumentChanged = e.target.value
      this.$emit('changeNotes', this.musicInstrumentChanged)
    },
  },
  computed: {
    buttonText: function () {
      return this.editOpen ? 'Opslaan' : 'Aanpassingen'
    },
    musicTitle: function () {
      return this.musicTitleChanged ? this.musicTitleChanged : this.title
    },
    selectedInstrument: function () {
      if (this.musicInstrumentChanged >= 0) {
        return this.musicInstrumentChanged
      } else if (this.$route.query.selected) {
        return this.$route.query.selected
      } else {
        return 0
      }
    },
  },
}
</script>

<style>
  .settings-tab {
    position: relative;
    margin: 2rem 2rem 0 2rem;
    border-radius: .5rem;
    padding: 1rem 2rem;
    background: var(--background-color);
    transition: all .3s;
  }

  .settings-tab--open {
    background: var(--white);
    box-shadow: var(--box-shadow);
    z-index: var(--z-index-low);
  }

  .settings-tab__text {
    margin-bottom: .5rem;
  }

  .settings-tab__text-h1 {
    font-family: var(--font-sans);
    margin-bottom: .5rem;
    width: 100%;
    background: transparent;
    font-weight: 400;
    font-size: var(--font-size-small);
    line-height: 1.1;
    border-bottom: .1rem solid transparent;
    padding: 0 0 .25rem 0;
    transition: all .3s;
  }

  .settings-tab__text-h1--open {
    border-bottom: .1rem solid var(--black);
  }

  .settings-tab__text-instrument {
    position: relative;
    width: 9.5rem;
  }

  .settings-tab__text-instrument--small {
    width: 3.5rem;
  }

  .settings-tab__text-instrument--open::after {
    content: "";
    position: absolute;
    right: 0;
    top: .25rem;
    z-index: 1;
    border: solid var(--theme-color);
    border-width: 0 .1rem .1rem 0;
    display: inline-block;
    padding: .2rem;
    transform: rotate(45deg);
  }

  .settings-tab__text-instrument-input {
    appearance: none;
    background: transparent;
    font-family: var(--font-sans);
    font-size: var(--font-size-smaller);
    font-weight: 300;
    display: block;
    color: var(--theme-color);
    margin-bottom: .5rem;
    padding-right: 1.5rem;
  }

  .settings-tab__text-tempo-input {
    background: transparent;
    font-family: var(--font-sans);
    font-size: var(--font-size-smaller);
    font-weight: 300;
    text-align: center;
    border: .05rem solid transparent;
    border-radius: .25rem;
  }

  .settings-tab__text-tempo-input--open {
    border: .05rem solid var(--theme-color);
  }

  .settings-tab__buttons {
    position: absolute;
    right: -.5rem;
    bottom: -.75rem;
  }

  .settings-tab__button {
    background: var(--gray);
    padding: .5rem;
    border-radius: .5rem;
    box-shadow: var(--box-shadow);
    width: 2.5rem;
    height: 2.5rem;
  }

  .settings-tab__button-icon {
    stroke-width: 1;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
