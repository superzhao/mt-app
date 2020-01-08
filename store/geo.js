
  export const state= ()=>({
    position: '',
    city: ''
  })
  export const mutations={
    setPosition(state, payload) {
      state.position = payload.position;
      state.city = payload.city;
    }
  }
  export const actions={
    setPosition({commit}, payload) {
      commit('setPosition', payload);
    }
  }
