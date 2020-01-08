
export const state = () => ({
  menu: []
})
export const mutations = {
  setMenu(state, payload) {
    state.menu = payload;
  }
}
export const actions = {
  setMenu({ commit }, payload) {
    commit('setMenu', payload);
  }
}
