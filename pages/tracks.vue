<template>
<v-row>
  <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
  <v-col cols="12" xl="6" lg="8" md="10">
    <v-row>
      <v-col v-for="(track, i) in tracks" :key="i" cols="12">
        <track-card :track="track"></track-card>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: "TracksPage",
  head(){
    return {
      title : "Tracks"
    }
  },
  computed : {
    tracks(){
      return this.$store.getters["tracks/tracks"]
    }
  },
  mounted(){
    this.$store.dispatch('tracks/fetchAllTracks')
  },
}
</script>

<style scoped>

</style>
