<template>
<v-row>
  <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
  <v-col cols="12" xl="6" lg="8" md="10">
    <v-row class="my-3">
      <v-col class="text-center" cols="12">
        <h1 class="text-h3 text-sm-h2 mb-3">Tracks</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="nameFilter" append-icon="mdi-magnify" clearable label="Type Track Name"
                      outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(track, i) in tracks" :key="i" cols="12" md="4">
        <track-card :track="track"></track-card>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: "TracksPage",
  data(){
    return {
      nameFilter : null,
    }
  },
  head(){
    return {
      title : "Tracks"
    }
  },
  computed : {
    tracks(){
      return this.$store.getters["tracks/tracks"].filter(this.selector)
    },
    selector () {
      return brand => this.nameFilter ? brand.name.toLowerCase().includes(this.nameFilter.toLowerCase()) : true
    },
  },
  mounted(){
    this.$store.dispatch('tracks/fetchAllTracks')
  },
}
</script>

<style scoped>

</style>
