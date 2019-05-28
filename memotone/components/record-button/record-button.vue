<template>
  <nuxt-link class="app-button" to="/record">
    <div class="app-button__button-container">
      <div class="app-button__button">
        <microphoneIcon class="app-button__button-icon" />
        <p
          class="a11y-sr-only"
        >
          Opnemen
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import microphoneIcon from '../../static/images/icons/mic.svg'

export default {
  props: {
    micOff: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    microphoneIcon,
  },
}
</script>


<style>
  .app-button__button-container,
  .app-button__button {
    position: absolute;
    border-radius: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }


  .app-button__button-container {
    height: 7.75rem;
    width: 7.75rem;
    background: var(--white);
  }

  .app-button__button {
    height: 6.5rem;
    width: 6.5rem;
    border: .625rem solid var(--record-color-half);
    background: var(--record-color);
    top: 50%;
  }


  .app-button__button-icon {
    position: absolute;
    height: 3.75rem;
    width: 2.25rem;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    color: var(--white);
  }
</style>

