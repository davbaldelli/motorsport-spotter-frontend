<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Incoming Events</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(event, i) in events" :key="i" cols="12" class="pa-2">
        <event-card :event="event"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment/moment";

export default {
  name: 'IndexPage',
  computed : {
    events() {
      return  this.$store.getters["events/events"].filter(event => event.start_date >= moment().format('DD-MM-YYYY'))
    }
  },
  mounted() {
    this.initialize()
  },
  methods : {
    initialize(){
      this.$store.dispatch('events/fetchEvents')
    }
  }
}
</script>
