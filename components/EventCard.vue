<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12" md="3">
        <v-img :src="event.image" class="rounded" height="175"/>
      </v-col>
      <v-col cols="12" md="9" class="d-flex flex-column">
        <v-card-title>
          <nuxt-link :to="`/championships/${event.championship.name}/${event.championship.year}/${event.name}`">
            <h3>{{ event.name }}</h3>
          </nuxt-link>
        </v-card-title>
        <v-card-subtitle class="pb-1">
          {{subtitle}}
        </v-card-subtitle>
        <v-card-text class="pb-1">
          {{periodLabel}}
        </v-card-text>
        <v-card-actions class="mt-auto px-4 pb-4 pt-0">
          <v-spacer/>
          <v-btn v-if="admin" :to="`/admin/edit/event/${event.id}`" color="orange">Edit</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "EventCard",
  props: ["event", "showTrack", "showChamp"],
  computed : {
    periodLabel(){
      const start = new Date(this.event.startDate)
      const end = new Date(this.event.endDate)
      const endMonth = end.toLocaleString('default', { month: 'short' });
      const startMonth = start.toLocaleString('default', { month: 'short' });
      return `${start.getDate()}${startMonth !== endMonth ? " "+startMonth : ""}-${end.getDate()} ${endMonth}`
    },
    admin () {
      return this.$store.getters['authentication/isAdmin']
    },
    subtitle(){
      const track = this.showTrack ? `@ ${this.event.track.name}` : ""
      const champ = this.showChamp ? this.event.championship.prettyName : ""
      return `${champ} ${track}`
    },
  }
}
</script>

<style scoped>

</style>
