import {nationsService} from "@/_services/nations";

const initialState = {
  nations : {items : [], notInitialized : true}
}

export const state = () => initialState

export const getters = {
  loadingNations: state => state.nations.fetching || state.nations.notInitialized,
  nations : state => state.nations.items
}

export const mutations = {
  nationsFetching (state) {
    state.nations = {
      items: state.nations.items,
      fetching : true
    }
  },
  nationsFetched (state, nations) {
    state.nations = {items : nations}
  },
  nationsFetchingError (state, error) {
    state.nations = {
      items : [],
      error
    }
  }
}

export const actions = {
  fetchAllNations ({dispatch, commit}) {
    commit('nationsFetching')
    return new Promise((resolve, reject) => nationsService.getAll()
      .then(nations => {
        commit('nationsFetched', nations)
        resolve(nations)
      })
      .catch(error => {
        commit('nationsFetchingError', error)
        dispatch('alert/error', error, {root:true})
        reject(error)
      }))
  }
}
