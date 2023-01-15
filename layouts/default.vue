<template>
  <v-app dark>
    <v-app-bar fixed elevate-on-scroll elevation="1" app>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation v-model="value" fixed app>
      <v-btn v-for="(item, i) in menuItems" plain :key="i" :to="item.to" :value="item.title">
        <span>{{item.title}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      value : 'recent',
      clipped: false,
      drawer: false,
      fixed: false,
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
      title: 'Vuetify.js',
    }
  },
}
</script>
