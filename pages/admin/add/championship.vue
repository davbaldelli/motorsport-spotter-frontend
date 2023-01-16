<template>
  <div>
    <championship-form :initial-value="initialValue" @submit="onSubmit"/>
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
  name: "AddChampionship",
  data() {
    return {
      showMsg: false,
      message: '',
      initialValue : {
        name : "",
        prettyName : "",
        image : "",
        logo : "",
        year : null,
        liveStream : null,
      }
    }
  },
 methods : {
   onSubmit (championship) {
     this.$store.dispatch('championship/pushChampionship', championship)
       .then(() => {
         this.message = 'Championship added successfully'
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
