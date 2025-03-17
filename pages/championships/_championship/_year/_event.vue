<template>
  <div>
    <v-row>
      <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block" />
      <v-col cols="12" xl="6" lg="8" md="10">
        <v-row>
          <v-col>
            <v-breadcrumbs
              :items="breadCrumbs"
              class="px-0 d-none d-md-flex"
            ></v-breadcrumbs>
          </v-col>
        </v-row>
        <div v-if="event">
          <v-row>
            <v-col cols="12" md="12">
              <v-img
                :src="event.image"
                class="rounded"
                alt="event image"
                :height="imageHeight"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h1>{{ name }}</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="align-center">
              <v-avatar size="50" class="pa-2 mt-auto white-background">
                <v-img :src="event.championship.logo" contain />
              </v-avatar>
              <nuxt-link
                class="px-3"
                :to="`/championships/${event.championship.name}/${event.championship.year}`"
              >
                <span>{{ event.championship.name }}</span>
              </nuxt-link>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="align-center">
              <v-icon size="50">mdi-map-marker</v-icon>
              <nuxt-link class="px-3" :to="`/tracks/${event.track.name}`">
                <span>{{ event.track.name }}</span>
              </nuxt-link>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h2>Sessions</h2>
            </v-col>
            <v-col v-for="(session, i) in sessions" :key="i" cols="12">
              <session-card :session="session" @askDelete="askDeleteConfirmation"/>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <div>
      <modal ref="confirmDeleteModal">
        <confirm-modal @confirmAction="confirmDialogAction" @cancelAction="closeConfirmDialog">
          <template #confirm-text>
            Are you sure you want to delete this session?
          </template>
        </confirm-modal>
      </modal>
    </div>
  </div>
</template>

<script>
import { sessionSorters } from '@/_helpers/session-sorters'

export default {
  name: 'EventDetail',
  asyncData({ params }) {
    return {
      championship: params.championship,
      year: params.year,
      name: params.event,
      breadCrumbs: [
        {
          text: 'Championships',
          disabled: false,
          exact: true,
          to: '/championships',
        },
        {
          text: `${params.championship} ${params.year}`,
          disabled: false,
          exact: true,
          to: `/championships/${params.championship}/${params.year}`,
        },
        {
          text: params.event,
          disabled: true,
          exact: true,
          to: `/championships/${params.championship}/${params.year}/${params.event}`,
        },
      ],
    }
  },
  data(){
    return {
      confirmDialogAction : () => {},
    }
  },
  head() {
    return {
      title: this.name,
    }
  },
  computed: {
    sessions() {
      return this.$store.getters['sessions/eventSessions'](this.event.id).sort(
        sessionSorters.sortByDateTime
      )
    },
    event() {
      return this.$store.getters['events/eventByUnique'](
        this.name,
        this.championship,
        this.year
      )
    },
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 200
        case 'sm':
          return 200
        case 'md':
          return 300
        case 'lg':
          return 400
        case 'xl':
          return 500
        default:
          return 200
      }
    },
  },
  mounted() {
    this.$store.dispatch('sessions/fetchSessions')
    this.$store.dispatch('events/fetchAllEvents')
  },
  methods : {
    askDeleteConfirmation(id) {
      this.confirmDialogAction = () => this.confirmEventDelete(id)
      this.$refs.confirmDeleteModal.openDialog()
    },
    closeConfirmDialog() {
      this.$refs.confirmDeleteModal.closeDialog()
      this.confirmDialogAction = () => {}
    },
    confirmEventDelete(id) {
      this.$store.dispatch('sessions/deleteSession', id)
      this.$refs.confirmDeleteModal.closeDialog()
    }
  }
}
</script>

<style scoped>
.white-background {
  border-radius: 50px;
  background-color: white;
}
</style>
