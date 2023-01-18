<template>
  <div>
    <lazy-session-form v-if="session" :initial-value="initialValue" @submit="onSubmit"/>
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
  name: "EditSession",
  middleware: 'admin',
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
      title : "Edit Session"
    }
  },
  computed : {
    initialValue () {
      return this.session ? {...this.session} : null
    },
    session() {
      return this.$store.getters["sessions/session"](this.id)
    }
  },
  mounted () {
    this.$store.dispatch('sessions/fetchSessions')
  },
  methods : {
    onSubmit(session) {
      this.$store.dispatch('sessions/updateSession', session)
        .then(() => {
          this.message = 'Session updated successfully'
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
