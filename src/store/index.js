import Vue from 'vue'
import Vuex from 'vuex'

import data from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: null,
    latent: [],
    drawnImageUrl: {}
  },

  mutations: {
    setConfig (state, {config}) {
      state.config = config
    },

    addLatentDataList (state, {latentDataList}) {
      state.latent.push(latentDataList)
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
