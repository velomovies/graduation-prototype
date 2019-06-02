<template>
  <section class="page-title">
    <h1
      class="page-title__h1"
      :class="{
        'page-title__h1--up' : uppercase,
      }"
    >
      {{ title }}
    </h1>
    <p class="meta">
      <slot></slot>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    uppercase: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>


<style>
  .page-title {
    margin: 2rem 2rem 3.5rem 2rem;
  }

  .page-title__h1--up {
    text-transform: capitalize;
  }
</style>

