<template>
  <header
    class="header"
  >
    <div
      class="header__container"
      :class="{ 'header__container--close' : isClose }"
    >
      <nuxt-link v-if="isBack" class="header__back" :to="page">
        <back-logo
          class="header__back-icon"
        />
        Terug
      </nuxt-link>

      <nuxt-link class="header__logo" :to="'/'">
        <main-logo class="header__logo-icon"/>
        <p v-if="!isClose && !isBack" class="header__logo-text">memo<span>tone</span></p>
        <p class="a11y-sr-only">Home</p>
      </nuxt-link>

      <nuxt-link v-if="isClose" class="header__close" :to="'/'">
        <close-icon class="header__close-icon" />
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import closeIcon from '../../static/images/icons/x.svg'
import mainLogo from '../../static/images/icons/logo.svg'
import backLogo from '../../static/images/icons/arrow-left.svg'

export default {
  components: {
    closeIcon,
    mainLogo,
    backLogo,
  },
  props: {
    isBack: {
      type: Boolean,
      default: false,
    },
    isClose: {
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
    background: var(--white);
  }

  .header__container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem .5rem 2rem;
    max-width: var(--app-width);
    margin: 0 auto;
  }

  .header__container--close {
    justify-content: space-between;
  }

  .header__logo {
    text-align: center;
  }

  .header__logo-icon {
    height: 3.5rem;
    width: 3.5rem;
  }

  .header__logo-text {
    margin-top: -1rem;
  }

  .header__logo-text span {
    color: var(--record-color);
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

  .header__close-icon {
    stroke-width: 1;
    width: 2rem;
    height: 2rem;
  }
</style>

