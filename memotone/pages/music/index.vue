<template>
  <div class="music">
    <app-header />
    <main class="music__main">
      <page-title
        :title="'Jouw eigen muziek'"
      >
        4 muziekopnames
      </page-title>
      <track-list />
    </main>
    <app-navigation />
  </div>
</template>

<script>
import appHeader from '../../components/app-header'
import appNavigation from '../../components/app-navigation'
import pageTitle from '../../components/page-title'
import trackList from '../../components/track-list'

export default {
  components: {
    appHeader,
    appNavigation,
    pageTitle,
    trackList,
  },
  mounted() {
    // console.log(JSON.parse(localStorage['icon']))
  },
}
</script>

<style>
</style>
