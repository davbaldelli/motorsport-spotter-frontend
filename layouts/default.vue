<template>
  <v-app dark>
    <v-app-bar fixed elevate-on-scroll elevation="1" app>
      <v-container fluid class="d-none d-sm-flex">
        <v-row no-gutters>
          <v-col cols="0" xl="3" lg="2" md="1" class="d-none d-md-block"/>
          <v-col class="d-inline-flex" cols="12" xl="6" lg="8" md="10">
            <v-btn v-for="(item, i) in menuItems" class="d-none d-sm-flex" plain :to="item.to" :key="i">
              <v-icon>{{item.icon}}</v-icon>
              {{item.text}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu offset-y v-if="admin">
              <template v-slot:activator="{ on, attrs }">
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
      admin : true,
      menuItems: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-heart',
          title: 'Favorites',
          to: '/favorites',
        },
        {
          icon: 'mdi-compass',
          title: 'Discover',
          to: '/discover',
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
}
</script>
