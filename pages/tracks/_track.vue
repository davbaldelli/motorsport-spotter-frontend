<template>
<v-row>
  <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
  <v-col cols="12" xl="6" lg="8" md="10">
    <v-row>
      <v-col>
        <v-breadcrumbs :items="breadCrumbs" class="px-0 d-none d-md-flex"></v-breadcrumbs>
      </v-col>
    </v-row>
    <div v-if="track">
      <v-row>
        <v-col cols="12" md="12" >
          <v-img :src="track.image" class="rounded" alt="championship image" :height="imageHeight">
            <div class="d-flex justify-center" style="height: 100%">
              <v-avatar size="100" class="mt-auto mb-5 white-background">
                <v-img :src="track.logo" contain/>
              </v-avatar>
            </div>
          </v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>{{name}}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn v-if="track && admin" color="orange" block :to="`/admin/edit/track/${track.id}`">Edit</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(event, i) in events" :key="i" cols="12">
          <event-card :event="event" :show-champ="true"/>
        </v-col>
      </v-row>
    </div>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: "TrackDetailPage",
  asyncData({params}){
    return {
      name : params.track,
      breadCrumbs : [
        {
          text: 'Tracks',
          disabled : false,
          exact : true,
          to: '/tracks',
        },
        {
          text: `${params.track}`,
          disabled : false,
          exact : true,
          to: `/tracks/${params.track}`,
        },
      ],
    }
  },
  computed : {
    track(){
      return this.$store.getters["tracks/trackByUnique"](this.name)
    },
    events(){
      return this.$store.getters["events/trackEvents"](this.track.id)
    },
    admin () {
      return this.$store.getters['authentication/isAdmin']
    },
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 200
        case 'sm':
          return 200
        case 'md':
          return 300
        case 'lg':
          return 400
        case 'xl':
          return 500
        default :
          return 200
      }
    },
  },
  mounted() {
    this.$store.dispatch('tracks/fetchAllTracks')
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
