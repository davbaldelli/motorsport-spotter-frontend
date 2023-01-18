<template>
  <v-row>
    <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
    <v-col cols="12" xl="6" lg="8" md="10">
      <v-row>
        <v-col>
          <h1>{{`${name} ${year}`}}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn v-if="championship && admin" color="orange" block :to="`/admin/edit/championship/${championship.id}`">Edit</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(event, i) in events" :key="i" cols="12">
          <event-card :event="event"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ChampionshipPage",
  asyncData({params}){
    return {
      name : params.name,
      year : params.year,
    }
  },
  head() {
    return {
      title : `${this.name} ${this.year}`
    }
  },
  computed : {
    championship() {
      return this.$store.getters["championships/championshipByUnique"](this.name, this.year)
    },
    events(){
      return this.$store.getters["events/championshipEvents"](this.name, this.year)
    },
    admin(){
      return true
    },
  },
  mounted() {
    this.$store.dispatch('championships/fetchAllChampionships')
    this.$store.dispatch('events/fetchAllEvents')
  }
}
</script>

<style scoped>

</style>
