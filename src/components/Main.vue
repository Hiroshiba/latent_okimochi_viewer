<template>
  <div style="display: flex; height: 100vh">
    <control style="flex: 4"/>
    <div style="flex: 6; overflow-y: scroll">
      <div v-for="_latentList in latent">
        <img v-for="_latent in _latentList" :src="drawnImageUrl[_latent.id]">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import Control from './Control.vue'

  export default {
    data () {
      return {}
    },

    components: {
      Control
    },

    computed: {
      ...mapState(['latent', 'drawnImageUrl'])
    }
  }
</script>
