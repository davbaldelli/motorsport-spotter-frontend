<template>
<v-card>
  <v-row no-gutters>
    <v-col cols="9">
      <v-card-title>
        {{session.name}}
      </v-card-title>
      <v-card-subtitle>
        {{datetime.format('dddd, MMMM DD, LT z')}}
      </v-card-subtitle>
    </v-col>
    <v-col cols="3" class="d-flex flex-column justify-center">
      <v-card-actions v-if="admin" class="px-3">
        <v-spacer/>
        <v-btn  :to="`/admin/edit/session/${session.id}`" color="orange">Edit</v-btn>
      </v-card-actions>
    </v-col>
  </v-row>
</v-card>
</template>

<script>


import moment from "moment-timezone";

export default {
  name: "SessionCard",
  props : ['session'],
  computed : {
    admin () {
      return this.$store.getters['authentication/isAdmin']
    },
    datetime(){
      return moment.tz(moment.tz(`${this.session.date} ${this.session.time}`,"Europe/Rome"), this.timeZone)
    },
    timeZone(){
      return  Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
  }
}
</script>

<style scoped>

</style>
