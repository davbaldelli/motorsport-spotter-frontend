<template>
<v-card>
  <v-row no-gutters>
    <v-col cols="3">
      <v-img :src="event.image" class="rounded" height="90"/>
    </v-col>
    <v-col cols="9">
      <v-row>

      </v-row>
      <v-row>
        <v-card-title>
          {{event.name}}
        </v-card-title>
      </v-row>
      <v-row>

      </v-row>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
export default {
  name: "EventCard",
  props: ["event"]
}
</script>

<style scoped>

</style>
