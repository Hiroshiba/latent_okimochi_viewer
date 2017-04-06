<template>
  <div>
    <button @click="addImage">追加</button>
    <template v-for="url in urls">
      <img :src="url">
    </template>
  </div>
</template>

<script>
  import utlity from '@/utility'

  export default {
    data () {
      return {
        'urls': []
      }
    },

    methods: {
      addImage () {
        const latent = utlity.randomLatent(this.$store.state.config.latentShape)

        const body = new FormData()
        body.append(this.$store.state.config.queryName, JSON.stringify(latent.tolist()))

        fetch(this.$store.state.config.apiUrl, {
          method: 'POST',
          mode: 'cors',
          body
        })
          .then(response => response.blob())
          .then(blob => URL.createObjectURL(blob))
          .then(url => this.urls.push(url))
      }
    }
  }
</script>
