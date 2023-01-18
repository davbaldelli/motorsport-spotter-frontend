<template>
<v-card>
  <v-row no-gutters>
    <v-col cols="9">
      <v-card-title>
        {{session.name}}
      </v-card-title>
      <v-card-subtitle>
        {{`${session.date} ${session.time}`}}
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
export default {
  name: "SessionCard",
  props : ['session'],
  computed : {
    admin () {
      return this.$store.getters['authentication/isAdmin']
    },
  }
}
</script>

<style scoped>

</style>
