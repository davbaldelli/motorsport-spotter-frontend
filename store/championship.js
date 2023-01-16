import {championshipsService} from "@/_services/championships";

const initialState = {
  championships : {
    items : [],
    notInitialized : true
  }
}

export const state = () => initialState

export const getters = {
  loadingChampionships : state => state.championships.fetching || state.championships.notInitialized,
  championships : state => state.championships.items,
  championship : state => (id) => state.championships.items.find(champ => champ.id === parseInt(id))
}

export const mutations = {
  championshipsFetching (state) {
    state.championships.fetching = {
      items : state.championships.items,
      fetching : true
    }
  },
  championshipsFetched (state, championships) {
    state.championships = { items : championships}
  },
  championshipsFetchingError (state, error) {
    state.championships = {
      items: [],
      error
    }
  },
  pushingChampionship (state){
    delete state.championships.error
    state.championships.pushing = true
  },
  championshipPushed (state){
    delete state.championships.pushing
  },
  championshipPushError(state){
    delete state.championships.pushing
    state.championships.error = state
  }
}

export const actions = {
  fetchAllChampionships ({dispatch, commit}) {
    commit('championshipsFetching')
    return new Promise((resolve, reject) => {
      championshipsService.getAll()
        .then(championships => {
          commit('championshipsFetched', championships)
          resolve(championships)
        })
        .catch(error => {
          commit('championshipsFetchingError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  },
  pushChampionship ({dispatch, commit}, championship) {
    commit('pushingChampionship')
    return new Promise((resolve, reject) => {
      championshipsService.pushChampionship(championship)
        .then(championship => {
          commit('championshipPushed')
          dispatch('fetchAllChampionships')
          dispatch('alert/success', championship, { root: true })
          resolve(championship)
        })
        .catch(error => {
          commit('championshipPushError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  },
  updateChampionship ({dispatch, commit}, championship) {
    commit('pushingChampionship')
    return new Promise((resolve, reject) => {
      championshipsService.updateChampionship(championship)
        .then(championship => {
          commit('championshipPushed')
          dispatch('fetchAllChampionships')
          dispatch('alert/success', championship, { root: true })
          resolve(championship)
        })
        .catch(error => {
          commit('championshipPushError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  }
}
