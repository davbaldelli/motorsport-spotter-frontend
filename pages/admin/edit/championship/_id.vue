<template>
  <div>
    <lazy-championship-form v-if="championship" :initial-value="initialValue" @submit="onSubmit"/>
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
  name: "EditChampionship",
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
      title : "Edit Championship"
    }
  },
  computed : {
    initialValue(){
      return this.championship ? {...this.championship} : null
    },
    championship() {
      return this.$store.getters["championship/championship"](this.id)
    }
  },
  mounted () {
    this.$store.dispatch('championship/fetchAllChampionships')
  },
  methods : {
    onSubmit(championship) {
      this.$store.dispatch('championship/updateChampionship', championship)
        .then(() => {
          this.message = 'Championship added successfully'
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
