<template>
  <nav class="navigation">
    <app-button />
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
  .navigation {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .navigation__link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }

  .navigation__link.nuxt-link-exact-active {
    color: var(--theme-color);
  }

  .navigation__link-icon {
    margin-bottom: .35rem;
  }
</style>
