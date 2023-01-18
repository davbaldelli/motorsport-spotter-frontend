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
      title : "Edit Championship"
    }
  },
  computed : {
    initialValue(){
      return this.championship ? {...this.championship} : null
    },
    championship() {
      return this.$store.getters["championships/championship"](this.id)
    }
  },
  mounted () {
    this.$store.dispatch('championships/fetchAllChampionships')
  },
  methods : {
    onSubmit(championship) {
      this.$store.dispatch('championships/updateChampionship', championship)
        .then(() => {
          this.message = 'Championship added successfully'
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
