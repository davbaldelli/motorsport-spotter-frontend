<template>
<v-row>
  <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
  <v-col cols="12" xl="6" lg="8" md="10">
    <v-row>
      <v-col v-for="(championship, i) in championships" :key="i" cols="4">
        <championship-card :championship="championship"/>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: "ChampionshipsHome",
  head(){
    return{
      title : "Championships"
    }
  },
  data(){
    return {

    }
  },
  computed : {
    championships(){
      return this.$store.getters["championship/championships"]
    }
  },
  mounted() {
    this.$store.dispatch('championship/fetchAllChampionships')
  }
}
</script>

<style scoped>

</style>
