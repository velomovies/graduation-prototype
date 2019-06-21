<template>
  <div class="app-share">
    <article class="app-share__article">
      <div
        class="app-share__article-container"
        :class="{ 'app-share__article-container--open' : shareOpen }"
      >
        <button @click="toggleShare">
          <transition name="fade">
            <share-icon class="app-share__article-toggle-icon" v-if="!shareOpen"/>
            <close-icon
              class="app-share__article-toggle-icon app-share__article-toggle-icon--close"
              v-if="shareOpen"
            />
          </transition>
        </button>
        <transition name="fade-in">
          <div v-if="shareOpen">
            <p
              class="app-share__article-text"
            >
              Deel jouw muziek
            </p>
            <ul class="app-share__article-links">
              <li>
                <a
                  href="https://wa.me/?text=Bekijk%20mijn%20eigen%20muziek%20op%20https://www.memotone.nl/music/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="app-share__article-link"
                >
                  <whatsapp-icon class="app-share__article-icon"/>
                  Whatsapp
                </a>
              </li>
              <li>
                <a
                  href="mailto:?subject=Mijn%20eigen%20muziek:%20Muziekopname&body=Bekijk%20mijn%20eigen%20muziek%20op%20https://www.memotone.nl/music/"
                  class="app-share__article-link"
                >
                  <mail-icon class="app-share__article-icon" />
                  Mail
                </a>
              </li>
              <li>
                <button
                  v-clipboard:copy="'https://www.memotone.nl/music/'"
                  class="app-share__article-link"
                >
                  <link-icon class="app-share__article-icon" />
                  Kopieer de link
                </button>
              </li>
              <li>
                <a
                  href="/fijne-verjaardag.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="app-share__article-link"
                >
                  <download-icon class="app-share__article-icon" />
                  Download de pdf
                </a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </article>
  </div>
</template>

<script>
import shareIcon from '../../static/images/icons/share-2.svg'
import whatsappIcon from '../../static/images/icons/whatsapp.svg'
import mailIcon from '../../static/images/icons/mail.svg'
import linkIcon from '../../static/images/icons/link.svg'
import downloadIcon from '../../static/images/icons/download.svg'
import closeIcon from '../../static/images/icons/x.svg'

export default {
  components: {
    whatsappIcon,
    mailIcon,
    linkIcon,
    downloadIcon,
    shareIcon,
    closeIcon,
  },
  data () {
    return {
      shareOpen: false,
    }
  },
  methods: {
    toggleShare () {
      this.shareOpen = !this.shareOpen
      this.$emit('toggleShare', this.shareOpen)
      return this.shareOpen
    },
  },
}
</script>

<style>
  .app-share {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: var(--z-index-overlay);
  }


  .app-share__article {
    position: relative;
    margin-left: 1rem;
    font-size: var(--font-size-small);
  }

  @media (min-width: 30rem) {
    .app-share__article {
      margin: 0 auto;
      max-width: 30rem;
    }
  }

  .app-share__article-container {
    background: var(--accent-color);
    width: 5rem;
    height: 3.5rem;
    right: 0;
    top: 0;
    position: absolute;
    border-radius: 0 0 0 .5rem;
    box-shadow: var(--box-shadow);
    transition: all .3s;
  }

  .app-share__article-container--open {
    width: 100%;
    height: 25rem;
  }

  .app-share__article-container div {
    margin: 1rem 2rem;
  }

  @media (min-width: 30rem) {
    .app-share__article-container {
      border-radius: 0 0 .5rem .5rem;
    }
  }

  .app-share__article-text {
    margin-bottom: 2rem;
    color: var(--white);
    font-size: var(--font-size);
  }

  .app-share__article-link {
    display: flex;
    align-items: center;
    background: var(--white);
    width: 100%;
    border-radius: .5rem;
    padding: 1rem;
    margin-bottom: .5rem;
    text-align: left;
  }

  .app-share__article-icon {
    stroke-width: 1;
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .app-share__article-toggle-icon {
    position: absolute;
    right: 2rem;
    top: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    color: var(--white);
    stroke-width: 1;
    transition: all .3s;
  }

  .app-share__article-toggle-icon--close {
    width: 2rem;
    height: 2rem;
  }

  .app-share__article-toggle-icon:hover {
    color: var(--black);
  }
</style>
