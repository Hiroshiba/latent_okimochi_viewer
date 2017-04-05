<template>
  <div>{{ $store.state.config.latentShape }}</div>
</template>

<script>
  import utlity from '@/utility'

  export default {
    mounted () {
      console.log(utlity.randomLatent(this.$store.state.config.latentShape).tolist())
    }
  }
</script>
