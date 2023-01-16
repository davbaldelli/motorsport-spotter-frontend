<template>
  <v-card class="pa-5" :to="`/championships/${championship.name}/${championship.year}/`">
    <v-img :src="championship.logo" height="200" :alt="`${championship.name} logo`" contain/>
    <v-card-title class="justify-center">{{championship.name}}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "ChampionshipCard",
  props : ['championship']
}
</script>

<style scoped>

</style>
