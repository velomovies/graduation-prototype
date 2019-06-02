<template>
  <ul class="project-list">
    <li class="project-list__link">
      <nuxt-link class="project-list__link-item" to="/music/eigen-opnames">
        <div class="project-list__image">
          <music-icon class="project-list__image-icon" />
        </div>
        <div class="project-list__text">
          <h2
            class="project-list__text-h2"
          >
            Eigen opnames
          </h2>
          <p class="project-list__text-p meta small-text">
            6 Opnames
          </p>
        </div>
      </nuxt-link>
    <li/>
    <li class="project-list__link">
      <nuxt-link class="project-list__link-item" to="/music/experimenteel">
        <div class="project-list__image">
          <music-icon class="project-list__image-icon" />
        </div>
        <div class="project-list__text">
          <h2
            class="project-list__text-h2"
          >
            Experimenteel
          </h2>
          <p class="project-list__text-p meta small-text">
            3 Opnames
          </p>
        </div>
      </nuxt-link>
    <li/>
    <li class="project-list__link">
      <nuxt-link class="project-list__link-item" to="/music/project-1">
        <div class="project-list__image">
          <music-icon class="project-list__image-icon" />
        </div>
        <div class="project-list__text">
          <h2
            class="project-list__text-h2"
          >
            Project 1
          </h2>
          <p class="project-list__text-p meta small-text">
            7 Opnames
          </p>
        </div>
      </nuxt-link>
    <li/>
    <li class="project-list__link">
      <nuxt-link class="project-list__link-item" to="/music/sunday-jams">
        <div class="project-list__image">
          <music-icon class="project-list__image-icon" />
        </div>
        <div class="project-list__text">
          <h2
            class="project-list__text-h2"
          >
            Sunday jams
          </h2>
          <p class="project-list__text-p meta small-text">
            5 Opnames
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
  .project-list {
    margin: 0 2rem;
  }

  .project-list__link {
    margin-bottom: 1rem;
  }

  .project-list__link-item {
    display: flex;
    align-items: center;
  }

  .project-list__image {
    width: 3rem;
    height: 3rem;
    background: var(--record-color-half);
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.25rem;
  }

  .project-list__image-icon {
    width: 2rem;
    height: 2rem;
  }
</style>

