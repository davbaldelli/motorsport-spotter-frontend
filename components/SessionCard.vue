<template>
<v-card :to="`/admin/edit/session/${session.id}`">
  <v-card-title>
    {{session.name}}
  </v-card-title>
</v-card>
</template>

<script>
export default {
  name: "SessionCard",
  props : ['session']
}
</script>

<style scoped>

</style>
