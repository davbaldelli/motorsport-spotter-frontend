<template>
  <v-app dark>
    <v-app-bar fixed elevate-on-scroll elevation="1" app>
      <v-container fluid class="d-none d-sm-flex">
        <v-row no-gutters>
          <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
          <v-col class="d-inline-flex" cols="12" xl="6" lg="8" md="10">
            <v-btn v-for="(item, i) in menuItems" class="d-none d-sm-flex" plain :to="item.to" :key="i">
              <v-icon>{{item.icon}}</v-icon>
              {{item.title}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu v-if="admin" offset-y>
              <template #activator="{ on, attrs }">
                <v-btn v-if="admin" class="d-none d-sm-flex" plain v-on="on" v-bind="attrs">
                  <v-icon>mdi-user</v-icon>
                  Admin
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in adminOptions" :key="i" link :to="item.to">
                  <v-list-item-content>
                    <v-list-item-title >{{item.text}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn v-if="admin" class="d-none d-sm-flex" plain @click="logOut">
              Logout
            </v-btn>
          </v-col>
          <v-col cols="0" lg="3" md="2"/>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>

    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      value : 'recent',
      menuItems: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon : 'mdi-heart',
          title: 'Championships',
          to: '/championships'
        },
        {
          icon: 'mdi-compass',
          title: 'Tracks',
          to: '/tracks',
        }
      ],
      adminOptions : [
        {text: "Add Championship", to :"/admin/add/championship", icon : "mdi-plus"},
        {text: "Add Track", to :"/admin/add/track", icon : "mdi-plus"},
        {text: "Add Event", to : "/admin/add/event", icon: "mdi-plus"},
        {text: "Add Session", to : "/admin/add/session", icon: "mdi-plus"}
      ],
    }
  },
  computed: {
    admin () {
      return this.$store.getters['authentication/isAdmin']
    },
    alert () {
      return this.$store.getters['alert/alert']
    },
    notCheckedUser() {
      return this.$store.getters['authentication/notChecked']
    }
  },
  watch: {
    $route () {
      // clear alert on location change
      this.$store.dispatch('alert/clear')
    },
    alert: {
      async handler (value) {
        if (value.message && value.message.status === 401) {
          await this.$router.push('/login')
        }
      },
      deep: true
    },
  },
  mounted() {
    if(this.notCheckedUser){
      const user = JSON.parse(localStorage.getItem('user'))
      if(user) {
        this.$store.dispatch('authentication/setUser', user)
      }
    }
  },
  methods: {
    async logOut () {
      await this.$store.dispatch('authentication/logout').then(() =>
        this.$store.dispatch('alert/clear')
      )
      this.$emit('loggedOut')
    }
  }
}
</script>
