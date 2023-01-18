<template>
  <v-card class="pa-5" :to="`/championships/${championship.name}/${championship.year}/`">
    <v-img :src="championship.logo" height="200" :alt="`${championship.name} logo`" contain/>
    <v-card-title class="justify-center"><h3 class="single-line">{{championship.name}}</h3></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "ChampionshipCard",
  props : ['championship']
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
</style>
