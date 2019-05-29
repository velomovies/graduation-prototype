<template>
  <div class="detail">
    <app-header
      isBack
      :page="`/music/${$route.params.slug}`"
    />
    <transition name="fade">
      <app-share v-if="showShare" @close="() => this.showShare = false"/>
    </transition>
    <main class="detail__main">
      <page-title isSmall>
        {{ getSlug($route.params.musicId) }}
      </page-title>
      <p>Hier komt een notenbalk met muziek</p>
    </main>
    <play-controls
      @shareClicked="() => this.showShare = true"
      @settingsClicked="() => this.showSettings = true"
    />
    <transition name="slide">
      <settings-tab v-if="showSettings" @close="() => this.showSettings = false"/>
    </transition>
    <transition name="fade">
      <div v-if="showSettings" @click="() => this.showSettings = false" class="settings-tab__underlay"></div>
    </transition>
  </div>
</template>

<script>
import appHeader from '../../../../components/app-header'
import appShare from '../../../../components/app-share'
import pageTitle from '../../../../components/page-title'
import playControls from '../../../../components/play-controls'
import settingsTab from '../../../../components/settings-tab'

export default {
  components: {
    appHeader,
    appShare,
    pageTitle,
    playControls,
    settingsTab,
  },
  data () {
    return {
      showShare: false,
      showSettings: false,
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
  .settings-tab__underlay {
    position: absolute;
    left: 0;
    top: 0;
    background: #33333390;
    height: 100%;
    width: 100%;
    z-index: var(--z-index-low);
  }
</style>

