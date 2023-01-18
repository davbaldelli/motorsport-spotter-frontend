<template>
  <div>
    <lazy-event-form v-if="event" :initial-value="initialValue" @submit="onSubmit"/>
    <v-snackbar v-model="showMsg">
      {{ message }}
      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="close">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "EditEvent",
  asyncData({params}){
    return {
      id : params.id
    }
  },
  data() {
    return {
      showMsg: false,
      message: '',
    }
  },
  head(){
    return{
      title : "Edit Event"
    }
  },
  computed : {
    initialValue(){
      return this.event ? {...this.event} : null
    },
    event() {
      return this.$store.getters["events/event"](this.id)
    }
  },
  mounted () {
    this.$store.dispatch('events/fetchAllEvents')
  },
  methods : {
    onSubmit(event) {
      this.$store.dispatch('events/updateEvent', event)
        .then(() => {
          this.message = 'Event updated successfully'
          this.showMsg = true
        })
        .catch(e => {
          this.message = e.data
          this.showMsg = true
        })
    },
    close() {
      this.showMsg = false
    },
  },
}
</script>

<style scoped>

</style>
