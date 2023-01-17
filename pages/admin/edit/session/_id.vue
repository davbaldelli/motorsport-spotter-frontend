<template>
  <div>
    <lazy-session-form v-if="session" :initial-value="session" @submit="onSubmit"/>
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
  head(){
    return{
      title : "Edit Session"
    }
  },
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
  computed : {
    session() {
      return {...this.$store.getters["session/session"](this.id)}
    }
  },
  mounted () {
    this.$store.dispatch('session/fetchSessions')
  },
  methods : {
    onSubmit(session) {
      this.$store.dispatch('session/updateSession', session)
        .then(() => {
          this.message = 'Session updated successfully'
          this.showMsg = true
        })
        .catch(e => {
          this.message = e
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
