/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-16 17:01:13
 */
import { createStore } from 'vuex'
import { domRef } from './domRef/index'

export default createStore({
  state: {
    blogThemeOneMain: {
      isAffixBottom: false,
      isAffixMove: false
    }
  },
  mutations: {
    updateBlogThemeOneMain (state, { isAffixBottom, isAffixMove }) {
      state.blogThemeOneMain.isAffixBottom = isAffixBottom
      state.blogThemeOneMain.isAffixMove = isAffixMove
    }
  },
  actions: {
    updateBlogThemeOneMain ({ commit }, payload) {
      commit('updateBlogThemeOneMain', payload)
    }
  },
  modules: {
    domRef
  }
})
