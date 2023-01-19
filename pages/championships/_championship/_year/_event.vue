<template>
<v-row>
  <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
  <v-col cols="12" xl="6" lg="8" md="10">
    <v-row>
      <v-col>
        <v-breadcrumbs :items="breadCrumbs" class="px-0 d-none d-md-flex"></v-breadcrumbs>
      </v-col>
    </v-row>
    <div v-if="event">
      <v-row>
        <v-col cols="12" md="12" >
          <v-img :src="event.image" class="rounded" alt="event image" :height="imageHeight"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>{{name}}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="align-center">
          <v-avatar size="50" class="pa-2 mt-auto white-background">
            <v-img :src="event.championship.logo" contain/>
          </v-avatar>
          <nuxt-link :to="`/championships/${event.championship.name}/${event.championship.year}/`">
            <span class="px-3">{{event.championship.prettyName}}</span>
          </nuxt-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2>Sessions</h2>
        </v-col>
        <v-col  v-for="(session, i) in sessions" :key="i" cols="12">
          <session-card :session="session"/>
        </v-col>
      </v-row>
    </div>
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
          text: `${params.championship} ${params.year}`,
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
    },
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 200
        case 'sm': return 200
        case 'md': return 300
        case 'lg': return 400
        case 'xl': return 500
        default : return 200
      }
    },
  },
  mounted() {
    this.$store.dispatch('events/fetchAllEvents')
  }
}
</script>

<style scoped>
.white-background{
  border-radius: 50px;
  background-color: white;
}
</style>
