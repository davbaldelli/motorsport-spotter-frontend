<template>
  <v-row>
    <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
    <v-col cols="12" xl="6" lg="8" md="10">
      <v-row>
        <v-col>
          <h1>{{`${this.name} ${this.year}`}}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn v-if="championship" color="orange" block :to="`/admin/edit/championship/${championship.id}`">Edit</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(event, i) in events" :key="i" cols="12" class="pa-2">
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
      title : this.name
    }
  },
  computed : {
    championship() {
      return this.$store.getters["championship/championshipByUnique"](this.name, this.year)
    },
    events(){
      if(this.championship){
        return this.$store.getters["events/events"].filter(event => event.championshipId === this.championship.id)
      }
      else return []
    },
  },
  mounted() {
    this.$store.dispatch('championship/fetchAllChampionships')
    this.$store.dispatch('events/fetchAllEvents')
  }
}
</script>

<style scoped>

</style>
