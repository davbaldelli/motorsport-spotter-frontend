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
  middleware: 'admin',
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
  head(){
    return{
      title : "Add Championship"
    }
  },
 methods : {
   onSubmit (championship) {
     this.$store.dispatch('championships/pushChampionship', championship)
       .then(() => {
         this.message = 'Championship added successfully'
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
