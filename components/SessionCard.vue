<template>
<v-card>
  <v-row no-gutters>
    <v-col cols="9">
      <v-card-title>
        {{session.name}}
      </v-card-title>
      <v-card-subtitle>
        {{datetime.format('dddd, MMMM DD, HH:mm  z')}}
      </v-card-subtitle>
    </v-col>
    <v-col cols="3" class="d-flex flex-column justify-center">
      <v-card-actions v-if="admin" class="px-3">
        <v-spacer/>
        <v-btn  :to="`/admin/edit/session/${session.id}`" color="orange">Edit</v-btn>
        <v-btn  @click="deleteSession" color="red">Delete</v-btn>
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
  emits : ['askDelete'],
  computed : {
    admin () {
      return this.$store.getters['authentication/isAdmin']
    },
    datetime(){
      return moment.tz(`${this.session.date} ${this.session.time}`,this.session.timezone).clone().tz(this.timeZone)
    },
    timeZone(){
      return  Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
  },
  methods :{
    deleteSession(){
      this.$emit('askDelete', this.session.id)
    }
  }
}
</script>

<style scoped>

</style>
