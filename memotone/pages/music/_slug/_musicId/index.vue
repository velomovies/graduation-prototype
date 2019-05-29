<template>
  <div class="detail">
    <app-header
      isBack
      :page="`/music/${$route.params.slug}`"
    />
    <main class="detail__main">
      <page-title isSmall>
        {{ getSlug($route.params.musicId) }}
      </page-title>
      <p>Hier komt een notenbalk met muziek</p>
      <app-share />
    </main>
    <play-controls />
  </div>
</template>

<script>
import appHeader from '../../../../components/app-header'
import appShare from '../../../../components/app-share'
import pageTitle from '../../../../components/page-title'
import playControls from '../../../../components/play-controls'

export default {
  components: {
    appHeader,
    appShare,
    pageTitle,
    playControls,
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

