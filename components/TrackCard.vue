<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="1" class="pa-3">
        <v-img :src="track.logo" class="circle pa-2" contain height="80" width="80"/>
      </v-col>
      <v-col class="d-flex flex-column">
        <v-card-title>
          {{track.name}}
        </v-card-title>
        <v-card-actions class="mt-auto px-4 pt-0">
          <v-spacer/>
          <v-btn v-if="admin" :to="`/admin/edit/track/${track.id}`" color="orange">Edit</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
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
  .circle{
    border-radius: 50px;
    background-color: white;
  }
</style>
