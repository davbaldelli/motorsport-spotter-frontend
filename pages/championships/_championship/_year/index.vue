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
        <v-col cols="12" md="12" >
          <v-img :src="championship.image" class="rounded" alt="championship image" :height="imageHeight">
            <div class="d-flex justify-center" style="height: 100%">
              <v-avatar size="100" class="pa-2 mt-auto mb-5 white-background">
                <v-img :src="championship.logo" contain/>
              </v-avatar>
            </div>
          </v-img>
        </v-col>
      </v-row>
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
      name : params.championship,
      year : params.year,
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
      ],
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
    admin () {
      return this.$store.getters['authentication/isAdmin']
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
    this.$store.dispatch('championships/fetchAllChampionships')
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
