<template>
    <v-row>
      <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
      <v-col cols="12" xl="6" lg="8" md="10">
        <v-row>
          <v-col>
            <h1>Incoming Events</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(event, i) in events" :key="i" cols="12">
            <event-card :event="event" :show-champ="true" :show-track="true" :show-delete="false"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'Home',
  head(){
    return {
      title : "Home"
    }
  },
  computed : {
    events() {
      return  this.$store.getters["events/thisWeekEvents"]
    }
  },
  mounted() {
    this.initialize()
  },
  methods : {
    initialize(){
      this.$store.dispatch('championships/fetchAllChampionships')
      this.$store.dispatch('tracks/fetchAllTracks')
      this.$store.dispatch('sessions/fetchSessions')
      this.$store.dispatch('nations/fetchAllNations')
      this.$store.dispatch('events/fetchAllEvents')
    }
  }
}
</script>


