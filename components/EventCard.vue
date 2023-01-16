<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="3">
        <v-img :src="event.image" class="rounded" height="150"/>
      </v-col>
      <v-col cols="9" class="d-flex flex-column">
        <v-card-title>
          <nuxt-link :to="`${event.name}`">{{ event.name }}</nuxt-link>
        </v-card-title>
        <v-card-subtitle>
          @ {{event.track.name}}
        </v-card-subtitle>
        <v-card-text>
        </v-card-text>
        <v-card-actions class="mt-auto px-4 pb-4 pt-0">
          <v-spacer/>
          <v-btn :to="`/admin/edit/event/${this.event.id}`" color="orange">Edit</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "EventCard",
  props: ["event"]
}
</script>

<style scoped>

</style>
