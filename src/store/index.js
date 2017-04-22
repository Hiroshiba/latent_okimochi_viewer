import numjs from 'NumJs'
import Vue from 'vue'
import Vuex from 'vuex'

import data from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: null,
    latent: [],
    latentMorphing: {'start': null, 'end': null},
    drawnImageUrl: {}
  },

  mutations: {
    setConfig (state, {config}) {
      state.config = config
    },

    setLatentMorphingStart (state, {latent}) {
      state.latentMorphing.start = latent
    },

    setLatentMorphingEnd (state, {latent}) {
      state.latentMorphing.end = latent
    },

    addLatentDataList (state, {latentDataList}) {
      state.latent.unshift(latentDataList)
    },

    addDrawnImageUrl (state, {latentId, url}) {
      Vue.set(state.drawnImageUrl, latentId, url)
    }
  },

  actions: {
    addLatent ({commit, dispatch}, {latentList}) {
      const latentDataList = latentList.map(l => new data.LatentData(l))
      commit('addLatentDataList', {latentDataList})

      latentDataList.forEach(latentData => {
        dispatch('draw', {latentData})
      })
    },

    addMorphing ({dispatch}, {latentMorphing, numStage = 7}) {
      const weight = numjs.arange(numStage).divide(numStage - 1, false)
      const latentList = weight.tolist().map(w => {
        const l1 = latentMorphing.start.multiply(1 - w, true)
        const l2 = latentMorphing.end.multiply(w, true)
        return l1.add(l2)
      })
      dispatch('addLatent', {latentList})
    },

    draw ({commit, state}, {latentData}) {
      const body = new FormData()
      body.append(state.config.queryName, JSON.stringify(latentData.latent.tolist()))

      fetch(state.config.apiUrl, {
        method: 'POST',
        mode: 'cors',
        body
      })
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => commit('addDrawnImageUrl', {latentId: latentData.id, url}))
    }
  }
})
