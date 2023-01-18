<template>
  <v-card :to="`/tracks/${track.name}`">
    <v-img :src="track.image" height="190" :alt="`${track.name}`">
      <div class="d-flex justify-center" style="height: 100%">
        <v-avatar size="80" class="pa-2 mt-auto mb-4 white-background">
          <v-img :src="track.logo" contain/>
        </v-avatar>
      </div>
    </v-img>
    <v-card-title class="justify-center"><h3 class="single-line">{{track.name}}</h3></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "TrackCard",
  props: ['track'],
  computed : {
    admin () {
      return this.$store.getters['authentication/isAdmin']
    },
  }
}
</script>

<style scoped>
.single-line{
  display: block !important;
  white-space: nowrap ;
  word-break: normal;
  overflow: hidden ;
  text-overflow: ellipsis;
}
.white-background{
  border-radius: 50px;
  background-color: white;
}
</style>
