<template>
  <main>
    <p>Detail page</p>
  </main>
</template>

<script>
export default {
  mounted() {
    console.log(JSON.parse(localStorage['icon']))
  },
}
</script>
