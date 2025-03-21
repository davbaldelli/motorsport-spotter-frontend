<template>
  <v-card :to="`/championships/${championship.name}/${championship.year}/`">
    <v-img :class="championship.archived ? 'grayscale' : ''" :src="championship.image" height="190" :alt="`${championship.name} logo`">
      <div class="d-flex justify-center" style="height: 100%">
        <v-avatar size="80" class="pa-2 mt-auto mb-4 white-background">
          <v-img :src="championship.logo" contain/>
        </v-avatar>
      </div>
    </v-img>
    <v-card-title class="justify-center">
      <h3 class="single-line">
        {{championship.name}}
        <span v-if="championship.archived"> - <span class="text-red-500">Archived</span></span>
      </h3></v-card-title>
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
.white-background{
  border-radius: 50px;
  background-color: white;
}
</style>
