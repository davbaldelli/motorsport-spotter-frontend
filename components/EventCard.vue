<template>
  <v-card :class="championship.archived ? 'grayscale' : ''">
    <NuxtLink
      class="card-link"
      :to="`/championships/${championship.name}/${championship.year}/${event.name}`"
    ></NuxtLink>
    <v-row no-gutters>
      <v-col cols="3">
        <v-img :src="event.image" class="rounded" :height="imageHeight" />
      </v-col>
      <v-col cols="9" class="d-flex flex-column">
        <v-card-text class="pt-2 pb-0">
          <span class="body-2">{{ periodLabel }}</span>
        </v-card-text>
        <v-card-title class="pt-0 pb-2">
          <h3 class="text-h6 text-md-h5 single-line">{{ event.name }}</h3>
        </v-card-title>
        <v-card-subtitle class="pb-2 pt-2">
          <span class="body-2">{{ subtitle }}</span>
        </v-card-subtitle>
        <v-card-actions
          class="mt-auto px-4 pb-4 pt-0 d-none d-md-flex z-index-10"
        >
          <v-spacer />
          <v-btn
            v-if="admin"
            :to="`/admin/edit/event/${event.id}`"
            color="orange"
            >Edit</v-btn
          >
          <v-btn v-if="admin && showDelete" @click="askDeleteEvent" color="red"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "EventCard",
  props: ["event", "showTrack", "showChamp", 'showDelete'],
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
    championship(){
      return this.$store.getters["championships/championship"](this.event.championshipId)
    },
    track(){
      return this.$store.getters["tracks/track"](this.event.trackId)
    },
    subtitle(){
      const track = this.showTrack ? `@ ${this.track.commonName}` : ""
      const champ = this.showChamp ? this.championship.prettyName : ""
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
  },
  methods : {
    askDeleteEvent(){
      this.$emit('delete', this.event.id)
      // this.$store.dispatch('events/deleteEvent', this.event.id)
    },
  },
}
</script>

<style scoped>
.single-line {
  display: block !important;
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-link {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
