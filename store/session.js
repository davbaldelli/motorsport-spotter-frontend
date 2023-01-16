import {sessionsService} from "@/_services/sessions";

const initialState = {
  sessions : {items : [], notInitialized : true}
}

export const state = () => initialState

export const getters = {
  loadingSessions : state => state.sessions.fetching || state.sessions.notInitialized,
  sessions : state => state.sessions.items,
  session : state => (id) => state.session.items.find(session => session.id === parseInt(id))
}

export const mutations = {
  sessionsFetching (state) {
    state.sessions = {
      items : state.sessions.items,
      fetching : true
    }
  },
  sessionsFetched (state, sessions) {
    state.sessions = { items : sessions}
  },
  sessionsFetchingError (state, error) {
    state.sessions = {
      items: [],
      error
    }
  },
  pushingSession (state){
    delete state.sessions.error
    state.sessions.pushing = true
  },
  sessionPushed (state){
    delete state.sessions.pushing
  },
  sessionPushError(state){
    delete state.sessions.pushing
    state.sessions.error = state
  }
}

export const actions = {
  fetchSessions ({dispatch, commit}) {
    commit('sessionsFetching')
    return new Promise((resolve, reject) => sessionsService.getAll()
      .then(sessions => {
        commit('sessionsFetched', sessions)
        resolve(sessions)
      })
      .catch(error => {
        commit('sessionsFetchingError', error)
        dispatch('alert/error', error, {root:true})
        reject(error)
      })
    )
  },
  pushSession({dispatch, commit}, session) {
    commit('pushingSession')
    return new Promise((resolve, reject) => {
      sessionsService.push(session)
        .then(session => {
          commit('sessionPushed')
          dispatch('fetchSessions')
          dispatch('alert/success', session, { root: true })
          resolve(session)
        })
        .catch(error => {
          commit('sessionPushError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  },
  updateSession({dispatch, commit}, session) {
    commit('pushingSession')
    return new Promise((resolve, reject) => {
      sessionsService.update(session)
        .then(session => {
          commit('sessionPushed')
          dispatch('fetchSessions')
          dispatch('alert/success', session, {root: true})
          resolve(session)
        })
        .catch(error => {
          commit('sessionPushError', error)
          dispatch('alert/error', error, {root: true})
          reject(error)
        })
    })
  }
}
