<template>
  <div class="musicProject">
    <app-header
      isBack
      :page="'/music'"
    />
    <main class="musicProject__main">
      <app-share />
    </main>
  </div>
</template>

<script>
import appHeader from '../../../components/app-header'
import appShare from '../../../components/app-share'

export default {
  components: {
    appHeader,
    appShare,
  },
}
</script>

<style>
</style>
