<template>
  <section class="onboarding">
    <article class="onboarding__article">
      <mic-icon class="onboarding__article-icon" />
      <p>Neem je zelf bedachte muziek op!</p>
    </article>
    <article class="onboarding__article">
      <headphone-icon class="onboarding__article-icon" />
      <p>Bekijk en luister je muziek terug!</p>
    </article>
    <article class="onboarding__article">
      <share-icon class="onboarding__article-icon" />
      <p>Deel de muziek met al je vrienden!</p>
    </article>
  </section>
</template>

<script>
import micIcon from '../../static/images/icons/mic.svg'
import headphoneIcon from '../../static/images/icons/headphones.svg'
import shareIcon from '../../static/images/icons/share-2.svg'

export default {
  components: {
    micIcon,
    headphoneIcon,
    shareIcon,
  },
}
</script>


<style>
  .onboarding {
    margin: 0 2rem;
  }

  .onboarding__article {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
  }

  .onboarding__article-icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    stroke-width: 1;
    margin-right: 2rem;
  }
</style>
