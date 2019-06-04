<template>
  <ul class="track-list">
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/op-het-strand-en-een-refrein?selected=0`">
        <div class="track-list__image">
          <music-icon class="track-list__image-icon" />
        </div>
        <div class="track-list__text">
          <div class="track-list__text-container">
            <h2
              class="track-list__text-h2"
            >
              Op het strand en een refrein
            </h2>
            <span class="meta">00:58</span>
          </div>
          <p class="track-list__text-p meta">
           <span>Zang</span>
          </p>
        </div>
      </nuxt-link>
    <li/>
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/op-het-strand?selected=1`">
        <div class="track-list__image">
          <music-icon class="track-list__image-icon" />
        </div>
        <div class="track-list__text">
          <div class="track-list__text-container">
            <h2
              class="track-list__text-h2"
            >
              Op het strand
            </h2>
            <span class="meta">00:21</span>
          </div>
          <p class="track-list__text-p meta">
           <span>Instrument in C</span>
          </p>
        </div>
      </nuxt-link>
    <li/>
    <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/experiment?selected=7`">
        <div class="track-list__image">
          <music-icon class="track-list__image-icon" />
        </div>
        <div class="track-list__text">
          <div class="track-list__text-container">
            <h2
              class="track-list__text-h2"
            >
              Experiment
            </h2>
            <span class="meta">00:45</span>
          </div>
          <p class="track-list__text-p meta">
           <span>Instrument in Bes</span>
          </p>
        </div>
      </nuxt-link>
    <li/>
        <li class="track-list__link">
      <nuxt-link class="track-list__link-item" :to="`/music/backing-vocals:-op-het-strand?selected=0`">
        <div class="track-list__image">
          <music-icon class="track-list__image-icon" />
        </div>
        <div class="track-list__text">
          <div class="track-list__text-container">
            <h2
              class="track-list__text-h2"
            >
              Backing vocals: op het strand
            </h2>
            <span class="meta">00:35</span>
          </div>
          <p class="track-list__text-p meta">
           <span>Zang</span>
          </p>
        </div>
      </nuxt-link>
    <li/>
  </ul>
</template>

<script>
import musicIcon from '../../static/images/icons/music.svg'

export default {
  components: {
    musicIcon,
  },
}
</script>

<style>
  .track-list {
    margin: 0 2rem;
  }

  .track-list__link-item {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .track-list__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 2rem .5rem 1rem;
    margin-bottom: 1.5rem;
    border-radius: .5rem;
    background: var(--white);
  }

  .track-list__image {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.25rem;
  }

  .track-list__image-icon {
    width: 2rem;
    height: 2rem;
  }

  .track-list__text-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .track-list__text {
    width: 100%;
  }

  .track-list__text-h2 {
    padding-right: .5rem;
  }

  .track-list__text-p {
    margin-top: .25rem;
  }
</style>

