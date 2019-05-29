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

      <app-share />
    </main>
    <app-navigation />
  </div>
</template>

<script>
import appHeader from '../../../components/app-header'
import appNavigation from '../../../components/app-navigation'
import appShare from '../../../components/app-share'
import pageTitle from '../../../components/page-title'

export default {
  components: {
    appHeader,
    appNavigation,
    appShare,
    pageTitle,
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
