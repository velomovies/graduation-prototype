<template>
  <div class="app-error">
    <article class="app-error__article">
      <p
        class="app-error__article-text"
      >
        Sta toe dat wij jouw microfoon mogen gebruiken, zodat je aan de slag kunt met je eigen muziek.
      </p>
      <p
        class="app-error__article-text"
      >
        Vind <a class="app-error__article-text-link" href="http://" target="_blank" rel="noopener noreferrer">hier</a> meer informatie over het gebruiken van je microfoon.
      </p>
      <nuxt-link class="app-error__article-link" to="/">
        Sluiten
      </nuxt-link>
    </article>
    <nuxt-link class="app-error__underlay" to="/"></nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .app-error {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--z-index-overlay);
  }

  .app-error__article {
    background: var(--white);
    padding: 2rem;
    margin: 2rem 1rem;
    border-radius: 1rem;
    text-align: center;
  }

  @media (min-width: 30rem) {
    .app-error__article {
      margin: 2rem auto;
      max-width: 25rem;
    }
  }

  .app-error__article-text {
    text-align: left;
    margin-bottom: 1rem;
    font-size: var(--font-size-small);
  }

  .app-error__article-text-link {
    color: var(--record-color);
    text-decoration: underline;
  }

  .app-error__article-link {
    color: var(--theme-color);
    font-size: var(--font-size);
  }

  .app-error__underlay {
    position: absolute;
    left: 0;
    top: 0;
    opacity: .5;
    background: var(--black);
    height: 100%;
    width: 100%;
    z-index: -1;
  }
</style>
