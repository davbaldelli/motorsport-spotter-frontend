<template>
<div>
  <lazy-track-form v-if="session" :initial-value="session" @submit="onSubmit"/>
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
  name: "TrackEdit",
  head(){
    return{
      title : "Edit Track"
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
      return {...this.$store.getters["tracks/track"](this.id)}
    }
  },
  mounted () {
    this.$store.dispatch('tracks/fetchAllTracks')
  },
  methods : {
    onSubmit(track) {
      this.$store.dispatch('tracks/updateTrack', track)
        .then(() => {
          this.message = 'Track updated successfully'
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
