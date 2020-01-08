const axios = require('axios');
export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const { status, data: { data:positonData } } = await axios.get('http://127.0.0.1:3000/geo/getPosition')
    commit('geo/setPosition', status == 200 ? positonData : { province: '1', city: '' })
    const { status:status1, data: menuData  } = await axios.get('http://127.0.0.1:3000/home/getMenu')
    commit('home/setMenu', status1 == 200&&menuData.code==0? menuData.data.menu : [])
  }
}
