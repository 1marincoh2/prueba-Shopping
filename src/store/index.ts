import VuexPersister from 'vuex-persister'
import cart from './modules/cart'
import { createStore } from 'vuex'

const vuexPersister = new VuexPersister({})

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
  },
  plugins: [vuexPersister.persist]
})

export default store
