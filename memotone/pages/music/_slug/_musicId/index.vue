<template>
  <div class="detail">
    <app-header
      isBack
      :page="'/archief/opgenomen'"
    />
    <main class="detail__main">
      <app-share />
    </main>
  </div>
</template>

<script>
import appHeader from '../../../../components/app-header'
import appShare from '../../../../components/app-share'

export default {
  components: {
    appHeader,
    appShare,
  },
}
</script>

<style>
</style>

