<template>
  <div>
    <track-form :initial-value="initialValue" @submit="onSubmit"></track-form>
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
  name: "AddTrack",
  middleware: 'admin',
  data() {
    return {
      showMsg: false,
      message: '',
      initialValue : {
        name : "",
        address : "",
        image : "",
        logo : "",
        nationCode : "",
      }
    }
  },
  head(){
    return{
      title : "Add Track"
    }
  },
  methods : {
    onSubmit(track) {
      this.$store.dispatch('tracks/pushTrack', track)
        .then(() => {
          this.message = 'Track added successfully'
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
  }
}
</script>

<style scoped>

</style>
