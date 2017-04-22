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
      <div>
        <div>shape: {{ this.latent.shape }}</div>
        <div>mean: {{ this.latent.mean() }}</div>
      </div>
      <div>
        <div>
          <ui-button @click="setRandn">randn</ui-button>
        </div>
        <hr>
        <div style="display: flex; flex-direction: column">
          <div>indexes</div>
          <div v-for="i in latent.ndim" style="display:flex; flex-direction: row">
            <div style="width: 80px">{{ i-1 }}: {{ latentIndexesValue[i-1] }}</div>
            <div style="flex: 1">
              <ui-slider
                  v-model="latentIndexesSlider[i-1]"
                  show-marker
                  :step="100/latent.shape[i-1]"
                  :marker-value="latentIndexesValue[i-1]"
              ></ui-slider>
            </div>
          </div>
        </div>
        <hr>
        <div style="display: flex; flex-direction: column">
          <div>value</div>
          <div style="display: flex; flex-direction: row">
            <div style="width: 80px">{{ value }}</div>
            <div style="flex: 1">
              <ui-slider
                  v-model="valueSlider"
                  show-marker
                  :marker-value="value"
              ></ui-slider>
            </div>
          </div>
        </div>
        <hr>
        <div style="display: flex; flex-direction: column">
          <div>set</div>
          <div style="display: flex; flex-direction: row">
            <div style="flex: 1; text-align: center">
              <ui-button @click="setAll(value)">all</ui-button>
            </div>
            <div style="flex: 1; text-align: center">
              <ui-button @click="setPoint(value)">point</ui-button>
            </div>
          </div>
        </div>
        <hr>
        <div style="display: flex; flex-direction: column">
          <div>morphing</div>
          <div style="display: flex; flex-direction: row">
            <div style="flex: 1; text-align: center">
              <ui-button @click="setLatentMorphingStart({latent: latent.clone()})">set first</ui-button>
            </div>
            <div style="flex: 1; text-align: center">
              <ui-button @click="setLatentMorphingEnd({latent: latent.clone()})">set end</ui-button>
            </div>
          </div>
        </div>
        <hr>
      </div>
      <div>
        <ui-button @click="addLatent({latentList: [latent]})">add</ui-button>
        <ui-button @click="addMorphing({latentMorphing: $store.state.latentMorphing})">morphing</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
  import numjs from 'NumJs'
  import {mapActions, mapMutations} from 'vuex'

  import utlity from '@/utility'

  export default {
    data () {
      return {
        latent: null,
        latentIndexesSlider: new Array(10).fill(0),
        valueSlider: 50
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

      setPoint (value) {
        this.latent.set(...this.latentIndexesValue.slice(), value)
      },

      ...mapMutations(['setLatentMorphingStart', 'setLatentMorphingEnd']),
      ...mapActions(['addLatent', 'addMorphing'])
    },

    computed: {
      latentShape () {
        return this.$store.state.config.latentShape
      },

      latentIndexesValue () {
        return this.latent.shape
          .map((s, i) => Math.floor(this.latentIndexesSlider[i] / 100 * s))
          .map((v, i) => v === this.latent.shape[i] ? v - 1 : v)
      },

      value () {
        return Math.round((this.valueSlider - 50) / 50 * 5 * 10) / 10
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
</style>
