
export const state = () => ({
  menu: [],
  hotPlace:[]
})
export const mutations = {
  setMenu(state, payload) {
    state.menu = payload;
  },
  setHotPlace(state, payload) {
    state.hotPlace = payload.splice(0,3);
  }
}
export const actions = {
  setMenu({ commit }, payload) {
    commit('setMenu', payload);
  },
  setHotPlace({ commit }, payload) {
    commit('setHotPlace', payload);
  }
}
