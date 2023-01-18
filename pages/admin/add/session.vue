<template>
  <div>
    <session-form :initial-value="initialValue" @submit="onSubmit"/>
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
  name: "AddSession",
  head(){
    return{
      title : "Add Session"
    }
  },
  data() {
    return {
      showMsg: false,
      message: '',
      initialValue: {
        name: null,
        eventId : null,
        datetime : null,
        durationMin : null,
        durationLaps : null,
      }
    }
  },
  methods : {
    onSubmit (session) {
      this.$store.dispatch('sessions/pushSession', session)
        .then(() => {
          this.message = 'Session added successfully'
          this.showMsg = true
        })
        .catch(e => {
          this.message = e
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
