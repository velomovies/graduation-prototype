<template>
  <nav class="navigation">
    <nuxt-link class="navigation__link small-text" to="/">
      <home-icon class="navigation__link-icon" />
      Home
    </nuxt-link>
    <record-button />
    <nuxt-link class="navigation__link small-text" to="/music">
      <music-icon class="navigation__link-icon" />
      Muziek
    </nuxt-link>
  </nav>
</template>

<script>
import homeIcon from '../../static/images/icons/home.svg'
import musicIcon from '../../static/images/icons/music.svg'
import recordButton from '../record-button'

export default {
  components: {
    recordButton,
    homeIcon,
    musicIcon,
  },
}
</script>

<style>
  .navigation {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: var(--white);
    display: flex;
    justify-content: space-around;
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
