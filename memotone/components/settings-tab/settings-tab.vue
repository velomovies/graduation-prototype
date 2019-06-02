<template>
    <section
      class="settings-tab"
      :class="{ 'settings-tab--open' : editOpen }"
    >
      <h1 class="settings-tab__text">Muziekopname</h1>
      <p class="settings-tab__text meta">Instrument in C</p>
      <p class="meta">Tempo: 90 bpm</p>
      <div class="settings-tab__buttons">
        <transition name="fade">
          <button v-if="editOpen" @click="editToggle" class="settings-tab__button">
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
  data () {
    return {
      editOpen: false,
    }
  },
  methods: {
    editToggle () {
      this.editOpen = !this.editOpen
      this.$emit('toggleEdit', this.editOpen)
      return this.editOpen
    },
  },
  computed: {
    buttonText: function () {
      return this.editOpen ? 'Opslaan' : 'Aanpassingen'
    },
  },
}
</script>

<style>
  .settings-tab {
    position: relative;
    margin: 2rem 2rem 4rem 2rem;
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
