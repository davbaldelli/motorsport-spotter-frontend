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
        <div v-if="championship">
          <v-row>
            <v-col cols="12" md="12">
              <v-img
                :src="championship.image"
                class="rounded"
                alt="championship image"
                :height="imageHeight"
              >
                <div class="d-flex justify-center" style="height: 100%">
                  <v-avatar
                    size="100"
                    class="pa-2 mt-auto mb-5 white-background"
                  >
                    <v-img :src="championship.logo" contain />
                  </v-avatar>
                </div>
              </v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h1>{{ `${name} ${year}` }}</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                v-if="admin"
                color="orange"
                block
                :to="`/admin/edit/championship/${championship.id}`"
                >Edit</v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                v-if="admin"
                color="red"
                block
                :disabled="championship.archived"
                @click="askArchiveConfirmation(championship.id)"
              >{{championship.archived ? "Archived" : "Archive"}}</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(event, i) in events" :key="i" cols="12">
              <event-card @delete="askDeleteConfirmation" :event="event" :show-track="true" :show-delete="true"/>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <div>
      <modal ref="confirmDeleteModal">
        <confirm-modal @confirmAction="confirmDialogAction" @cancelAction="closeConfirmDialog">
          <template #confirm-text>
            Are you sure you want to delete this event?
          </template>
        </confirm-modal>
      </modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChampionshipPage',
  asyncData({ params }) {
    return {
      name: params.championship,
      year: params.year,
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
      title: `${this.name} ${this.year}`,
    }
  },
  computed: {
    championship() {
      return this.$store.getters['championships/championshipByUnique'](
        this.name,
        this.year
      )
    },
    events() {
      return this.$store.getters['events/championshipEvents'](
        this.name,
        this.year
      )
    },
    admin() {
      return this.$store.getters['authentication/isAdmin']
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
    this.$store.dispatch('championships/fetchAllChampionships')
    this.$store.dispatch('events/fetchAllEvents')
  },
  methods: {
    askDeleteConfirmation(id) {
      this.confirmDialogAction = () => this.confirmEventDelete(id)
      this.$refs.confirmDeleteModal.openDialog()
    },
    askArchiveConfirmation(id) {
      this.confirmDialogAction = () => this.confirmArchive(id)
      this.$refs.confirmDeleteModal.openDialog()
    },
    closeConfirmDialog() {
      this.$refs.confirmDeleteModal.closeDialog()
      this.confirmDialogAction = () => {}
    },
    confirmEventDelete(id) {
      this.$store.dispatch('events/deleteEvent', id)
      this.$refs.confirmDeleteModal.closeDialog()
    },
    confirmArchive(id) {
      this.$store.dispatch('championships/archiveChampionship', id)
      this.$refs.confirmDeleteModal.closeDialog()
    }
  },
}
</script>

<style scoped>
.white-background {
  border-radius: 50px;
  background-color: white;
}


</style>
