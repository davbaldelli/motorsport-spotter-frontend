<template>
  <div>
    <event-form :initial-value="initialValue" @submit="onSubmit"/>
    <v-snackbar v-model="showMsg">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="close">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "AddEvent",
  middleware: 'admin',
  data() {
    return {
      showMsg: false,
      message: '',
      initialValue: {
        name: null,
        image: null,
        trackId : null,
        championshipId : null,
        startDate : null,
        endDate : null,
      }
    }
  },
  head(){
    return{
      title : "Add Event"
    }
  },
  methods : {
    onSubmit (event) {
      this.$store.dispatch('events/pushEvent', event)
        .then(() => {
          this.message = 'Event added successfully'
          this.showMsg = true
        })
        .catch(e => {
          this.message = e.data
          this.showMsg = true
        })
    },
    close(){
      this.showMsg = false
    },
  }
}
</script>

<style scoped>

</style>
