<template>
  <v-card :to="`/championships/${event.championship.name}/${event.championship.year}/${event.name}`">
    <v-row no-gutters>
      <v-col cols="3">
        <v-img :src="event.image" class="rounded" :height="imageHeight"/>
      </v-col>
      <v-col cols="9" class="d-flex flex-column">
        <v-card-text class="pt-2 pb-0">
          <span class="subtitle-2">{{periodLabel}}</span>
        </v-card-text>
        <v-card-title class="pt-0 pb-2">
          <h3 class="text-h6 text-md-h5 single-line">{{ event.name }}</h3>
        </v-card-title>
        <v-card-subtitle class="pb-2 pt-3">
          <span class="body-2">{{subtitle}}</span>
        </v-card-subtitle>
        <v-card-actions class="mt-auto px-4 pb-4 pt-0 d-none d-md-flex">
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
      const track = this.showTrack ? `@ ${this.event.track.commonName}` : ""
      const champ = this.showChamp ? this.event.championship.prettyName : ""
      return `${champ} ${track}`
    },
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 100
        case 'sm': return 100
        case 'md': return 125
        case 'lg': return 150
        case 'xl': return 150
        default : return 120
      }
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
</style>
