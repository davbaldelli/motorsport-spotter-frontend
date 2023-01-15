import {eventsService} from "@/_services/events";

const initialState = {
  events : {items : [] , notInitialized : true}
}

export const state = () => initialState

export const getters = {
  loadingEvents: state => state.events.fetching || state.events.notInitialized,
  events : state => state.events.items
}

export const mutations = {
  eventsFetching (state) {
    state.events.fetching = {
      items : state.events.items,
      fetching : true
    }
  },
  eventsFetched (state, events) {
    state.events = { items : events}
  },
  eventsFetchingError (state, error) {
    state.events = {
      items: [],
      error
    }
  }
}

export const actions = {
  fetchEvents ({dispatch, commit}) {
    commit('eventsFetching')
    return new Promise((resolve, reject) => eventsService.getAll()
      .then(events => {
        commit('eventsFetched', events)
        resolve(events)
      })
      .catch(error => {
        commit('eventsFetchingError', error)
        dispatch('alert/error', error, {root:true})
        reject(error)
      })
    )
  }
}

