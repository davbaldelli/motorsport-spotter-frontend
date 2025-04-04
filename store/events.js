import moment from "moment";
import {eventsService} from "@/_services/events";

const initialState = {
  events : {items : [] , notInitialized : true}
}

export const state = () => initialState

export const getters = {
  loadingEvents: state => state.events.fetching || state.events.notInitialized,
  events : state => state.events.items,
  incomingEvents : state => state.events.items.filter(isIncoming),
  thisWeekEvents : state => state.events.items.filter(isInThisWeek),
  event :state => (id) => state.events.items.find(event => event.id === parseInt(id)),
  eventByUnique : state => (name, championshipId) => state.events.items.find(e =>
    e.name === name && e.championshipId === championshipId),
  championshipEvents : state => (championshipId) => state.events.items.filter(event =>
    event.championshipId === championshipId),
  trackEvents : state => (trackId) => state.events.items.filter(event => event.trackId === trackId)
}

export const mutations = {
  eventsFetching (state) {
    state.events = {
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
  },
  pushingEvent (state){
    delete state.events.error
    state.events.pushing = true
  },
  eventPushed (state){
    delete state.events.pushing
  },
  eventPushError(state){
    delete state.events.pushing
    state.events.error = state
  },
  deletingEvent (state){
    delete state.events.error
    state.events.deleting = true
  },
  eventDeleted (state){
    delete state.events.deleting
  },
  eventDeletingError(state){
    delete state.events.deleting
    state.events.error = state
  }
}

export const actions = {
  fetchAllEvents ({dispatch, commit}) {
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
  },
  fetchIncomingEvents ({dispatch, commit}) {
    commit('eventsFetching')
    return new Promise((resolve, reject) => eventsService.getIncoming()
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
  },
  pushEvent({dispatch, commit}, event) {
    commit('pushingEvent')
    return new Promise((resolve, reject) => {
      eventsService.pushEvent(event)
        .then(event => {
          commit('eventPushed')
          dispatch('fetchAllEvents')
          dispatch('alert/success', event, { root: true })
          resolve(event)
        })
        .catch(error => {
          commit('eventPushError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  },
  updateEvent({dispatch, commit}, event) {
    commit('pushingEvent')
    return new Promise((resolve, reject) => {
      eventsService.updateEvent(event)
        .then(event => {
          commit('eventPushed')
          dispatch('fetchAllEvents')
          dispatch('alert/success', event, { root: true })
          resolve(event)
        })
        .catch(error => {
          commit('eventPushError', error)
          dispatch('alert/error', error, {root:true})
          reject(error)
        })
    })
  },
  deleteEvent({dispatch, commit}, id) {
    commit('deletingEvent')
    return new Promise((resolve, reject) => {
      eventsService.deleteEvent(id)
        .then(() => {
          commit('eventDeleted')
          dispatch('fetchAllEvents')
          dispatch('alert/success', 'Event deleted', {root: true})
          resolve()
        })
        .catch(error => {
          commit('eventDeletingError', error)
          dispatch('alert/error', error, {root: true})
        })
    })
  }
}

function isIncoming(event){
  const today = moment().format("YYYY-MM-DD")
  // const nextWeek = today.addDays(7)
  console.log(today)
  return event.endDate >= today
}

function isInThisWeek(event){
  const today = moment()
  const nextWeek = moment().add(7, 'days')
  const startDate = moment(event.startDate)
  const endDate = moment(event.endDate)
  return startDate.isBetween(today, nextWeek,"days", "[]")
    || endDate.isBetween(today, nextWeek, "days", "[]")
    || (today.isSameOrAfter(startDate) && nextWeek.isSameOrBefore(endDate))
}

