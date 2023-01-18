<template>
<v-row>
  <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
  <v-col cols="12" xl="6" lg="8" md="10">
    <v-row>
      <v-col>
        <v-breadcrumbs :items="breadCrumbs" class="px-0"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>{{name}}</h1>
      </v-col>
    </v-row>
    <v-row v-if="event">
      <v-col  v-for="(session, i) in sessions" :key="i" cols="12">
        <session-card :session="session"/>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
import {sessionSorters} from "@/_helpers/session-sorters";

export default {
  name: "EventDetail",
  asyncData({params}){
    return {
      championship : params.championship,
      year : params.year,
      name : params.event,
      breadCrumbs : [
        {
          text: 'Championships',
          disabled : false,
          exact : true,
          to: '/championships',
        },
        {
          text: `${params.name} ${params.year}`,
          disabled : false,
          exact : true,
          to: `/championships/${params.championship}/${params.year}`,
        },
        {
          text: params.event,
          disabled : true,
          exact : true,
          to: `/championships/${params.championship}/${params.year}/${params.event}`,
        },
      ],
    }
  },
  head(){
    return {
      title : this.name
    }
  },
  computed : {
    sessions(){
      return [...this.event.sessions].sort(sessionSorters.sortByDateTime)
    },
    event() {
      return this.$store.getters["events/eventByUnique"](this.name, this.championship, this.year)
    }
  },
  mounted() {
    this.$store.dispatch('events/fetchAllEvents')
  }
}
</script>

<style scoped>

</style>
