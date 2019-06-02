<template>
  <header class="header">
    <nuxt-link v-if="isBack" class="header__back" :to="page">
      <back-logo
        class="header__back-icon"
      />
      Terug
    </nuxt-link>

    <nuxt-link class="header__logo" :to="'/'">
      <main-logo class="header__logo-icon"/>
      <p class="a11y-sr-only" v-if="!isBack">Home</p>
    </nuxt-link>
  </header>
</template>

<script>
import mainLogo from '../../static/images/icons/logo.svg'
import backLogo from '../../static/images/icons/arrow-left.svg'

export default {
  components: {
    mainLogo,
    backLogo,
  },
  props: {
    isBack: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: '/',
    },
  },
}
</script>

<style>
  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .25rem 1.5rem .25rem 1.5rem;
    background: var(--white);
  }

  .header__logo-icon {
    height: 3.5rem;
    width: 3.5rem;
  }

  @media (min-width: 30rem) {
    .header__logo-icon {
      height: 5rem;
      width: 5rem;
    }
  }

  .header__back {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1.5rem;
  }

  .header__back-icon {
    transform: translate(.25rem, .175rem);
    height: 1rem;
    width: 1rem;
    transition: transform .3s;
  }

  .header__back:hover .header__back-icon,
  .header__back:focus .header__back-icon {
    transform: translate(0, .175rem);
  }
</style>

