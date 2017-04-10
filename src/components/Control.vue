<template>
  <div class="sidebar">
    <ui-toolbar
        brand="Latent Okimochi Viewer"
        remove-nav-icon
        text-color="white"
        type="colored"
        :raised="false"
    >
    </ui-toolbar>
    <div v-if="latent!==null">
      <div>shape: {{ this.latent.shape }}</div>
      <div>mean: {{ this.latent.mean() }}</div>
    </div>
    <div>
      <div>
        <ui-button @click="setRandn">randn</ui-button>
      </div>
      <div style="display:flex; flex-direction:row">
        <ui-slider
            v-model="allSlider"
            show-marker
            :marker-value="allValue"
            style="flex: 1"
        ></ui-slider>
        <ui-button @click="setAll(allValue)" style="width: 100px">{{ 'all: ' + allValue.toFixed(1) }}</ui-button>
      </div>
    </div>
    <div>
      <ui-button @click="addLatent({latentList: [latent]})">add</ui-button>
    </div>
  </div>
</template>

<script>
  import numjs from 'NumJs'
  import { mapActions } from 'vuex'

  import utlity from '@/utility'

  export default {
    data () {
      return {
        latent: null,
        allSlider: 50
      }
    },

    mounted () {
      this.latent = numjs.zeros(this.latentShape)
    },

    methods: {
      setRandn () {
        this.latent = utlity.randomLatent(this.$store.state.config.latentShape)
      },

      setAll (value) {
        this.latent = numjs.ones(this.latentShape).multiply(value)
      },

      ...mapActions(['addLatent'])
    },

    computed: {
      latentShape () {
        return this.$store.state.config.latentShape
      },

      allValue () {
        return Math.round((this.allSlider - 50) / 50 * 5 * 10) / 10
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
</style>
