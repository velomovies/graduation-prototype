<template>
  <div class="musicProject">
    <app-header
      isBack
      :page="'/music'"
    />
    <transition name="fade">
      <app-share v-if="showShare" @close="() => this.showShare = false"/>
    </transition>
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
import appShare from '../../../components/app-share'
import appNavigation from '../../../components/app-navigation'
import pageTitle from '../../../components/page-title'
import trackList from '../../../components/track-list'

export default {
  components: {
    appHeader,
    appShare,
    appNavigation,
    pageTitle,
    trackList,
  },
  data () {
    return {
      showShare: false,
    }
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
