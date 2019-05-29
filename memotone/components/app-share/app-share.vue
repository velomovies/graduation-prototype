<template>
  <div class="app-share">
    <article class="app-share__article">
      <p
        class="app-share__article-text"
      >
        Deel jouw muziek via
      </p>
      <div class="app-share__article-links">
        <a
          href="https://wa.me/?text=Bekijk%20mijn%20eigen%20muziek%20op%20https://www.memotone.nl"
          target="_blank"
          rel="noopener noreferrer"
          class="app-share__article-link"
        >
          <whatsapp-icon />
          Whatsapp
        </a>
        <a
          href="mailto:?subject=Mijn%20eigen%20muziek:%20Opname%201&body=Bekijk%20mijn%20eigen%20muziek%20op%20https://www.memotone.nl"
          class="app-share__article-link"
        >
          <mail-icon />
          Mail
        </a>
        <button
          v-clipboard:copy="'https://www.memotone.nl'"
          class="app-share__article-link"
        >
          <link-icon />
          Kopieer de link
        </button>
      </div>
      <p class="app-share__article-text--center">of</p>
      <a
        href="/opname-1.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="app-share__article-link"
       >
        <download-icon />
        Download de pdf
      </a>
    </article>
    <div @click="e => this.$emit('close', e)" class="app-share__underlay"></div>
  </div>
</template>

<script>
import whatsappIcon from '../../static/images/icons/whatsapp.svg'
import mailIcon from '../../static/images/icons/mail.svg'
import linkIcon from '../../static/images/icons/link.svg'
import downloadIcon from '../../static/images/icons/download.svg'

export default {
  components: {
    whatsappIcon,
    mailIcon,
    linkIcon,
    downloadIcon,
  },
}
</script>

<style>
  .app-share {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--z-index-overlay);
  }

  .app-share__article {
    background: var(--white);
    padding: 2rem;
    margin: 2rem 1rem;
    border-radius: 1rem;
    text-align: center;
  }

  @media (min-width: 30rem) {
    .app-share__article {
      margin: 2rem auto;
      max-width: 25rem;
    }
  }

  .app-share__article-text {
    text-align: left;
    margin-bottom: 2rem;
  }

  .app-share__article-text--center {
    margin-bottom: 1rem;
  }

  .app-share__article-links {
    display: flex;
    justify-content: space-between;
  }

  .app-share__article-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--font-size);
    margin-bottom: 1rem;
  }

  .app-share__underlay {
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
