<template>
  <div class="musicProject">
    <app-header
      isBack
      :page="'/music'"
    />
    <main class="musicProject__main">
      <page-title withImage>
        {{ getSlug($route.params.slug) }}
      </page-title>
      <track-list />
    </main>
    <app-navigation />
  </div>
</template>

<script>
import appHeader from '../../../components/app-header'
import appNavigation from '../../../components/app-navigation'
import pageTitle from '../../../components/page-title'
import trackList from '../../../components/track-list'

export default {
  components: {
    appHeader,
    appNavigation,
    pageTitle,
    trackList,
  },
  methods: {
    getSlug(string) {
      string = string.replace(/-/g,' ')
      return string
    },
  },
}
</script>

<style>
</style>
