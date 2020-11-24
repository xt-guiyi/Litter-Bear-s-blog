import { Module } from 'vuex'
export const domRef: Module<Record<string, string[]>, any> = {
  namespaced: true,
  state: {
    // articlePanel面板隐藏元素
    hideDOmRef: [],
    //
    homeDomRef: []
  },
  mutations: {
    updateHideDOm (state, payload) {
      state.hideDOmRef.push(payload as never)
    },
    updateHomeDom (state, payload) {
      state.homeDomRef = payload
    }
  },
  actions: {
    updateHideDOm ({ commit }, payload) {
      commit('updateHideDOm', payload)
    },
    updateHomeDom ({ commit }, payload) {
      commit('updateHomeDom', payload)
    }
  }
}
