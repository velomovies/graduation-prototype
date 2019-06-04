<template>
  <nav class="play-controls">
    <app-button
      isPlay
      @toggleMusic="(data) => this.$emit('toggleMusic', data)"
    />
  </nav>
</template>

<script>
import appButton from '../app-button'

export default {
  components: {
    appButton,
  },
}
</script>

<style>
  .play-controls {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .play-controls__link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    color: var(--black);
  }

  .play-controls__link-icon {
    margin-bottom: .35rem;
  }
</style>
