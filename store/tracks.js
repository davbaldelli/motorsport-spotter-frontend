import {tracksService} from "@/_services/tracks";

const initialState = {
  tracks : {
    items : [],
    notInitialized : true
  }
}

export const state = () => initialState

export const getters = {
  loadingTracks : state => state.tracks.fetching || state.tracks.notInitialized,
  tracks : state => state.tracks.items,
  track : state => (id) => state.tracks.items.find(track => track.id === parseInt(id)),
  trackByUnique : state => (name) => state.tracks.items.find(t => t.name === name)
}

export const mutations = {
  tracksFetching (state) {
    state.tracks = {
      items : state.tracks.items,
      fetching : true
    }
  },
  tracksFetched (state, tracks) {
    state.tracks = { items : tracks}
  },
  tracksFetchingError (state, error) {
    state.tracks = {
      items: [],
      error
    }
  },
  pushingTrack (state){
    delete state.tracks.error
    state.tracks.pushing = true
  },
  trackPushed (state){
    delete state.tracks.pushing
  },
  trackPushError(state){
    delete state.tracks.pushing
    state.tracks.error = state
  }
}

export const actions = {
  fetchAllTracks ({dispatch, commit}) {
    commit('tracksFetching')
    return new Promise((resolve, reject) => {
      tracksService.getAll()
        .then(tracks => {
          commit('tracksFetched', tracks)
          resolve(tracks)
        })
        .catch(error => {
          commit('tracksFetchingError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  },
  pushTrack ({dispatch, commit}, trackTrack) {
    commit('pushingTrack')
    return new Promise((resolve, reject) => {
      tracksService.pushTrack(trackTrack)
        .then(trackTrack => {
          commit('trackPushed')
          dispatch('fetchAllTracks')
          dispatch('alert/success', trackTrack, { root: true })
          resolve(trackTrack)
        })
        .catch(error => {
          commit('trackPushError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  },
  updateTrack ({dispatch, commit}, trackTrack) {
    commit('pushingTrack')
    return new Promise((resolve, reject) => {
      tracksService.updateTrack(trackTrack)
        .then(trackTrack => {
          commit('trackPushed')
          dispatch('fetchAllTracks')
          dispatch('alert/success', trackTrack, { root: true })
          resolve(trackTrack)
        })
        .catch(error => {
          commit('trackPushError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  }
}

