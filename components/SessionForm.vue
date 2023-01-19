<template>
  <v-container fluid>
    <v-row>
      <v-col cols="0" xl="4" lg="2" md="1" class="d-none d-md-block"/>
      <v-col cols="12" xl="4" lg="8" md="10">
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
          <v-row>
            <v-col>
              <v-text-field v-model="form.name" :rules="rules.required" label="Name" required/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                ref="menu"
                v-model="calendar1"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="form.time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field v-model="form.time" label="Session Start" prepend-icon="mdi-clock-time-four-outline"
                                readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-time-picker
                  v-if="calendar1"
                  v-model="form.time"
                  full-width
                  @click:minute="$refs.menu.save(form.time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu ref="calendar2" v-model="calendar2" :close-on-content-click="false" :return-value.sync="form.date"
                      transition="scale-transition" offset-y min-width="auto">
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.date"
                    label="Session Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form.date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="calendar2 = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.calendar2.save(form.date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-autocomplete v-model="form.timezone" :items="timezones" :rules="rules.required" label="Timezone" required/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete v-model="form.eventId" :items="events" :rules="rules.required"
                              :item-text="e => `${e.championship.name} ${e.championship.year} - ${e.name}`" item-value="id"
                              label="Event" required/>
            </v-col>
            <v-col>
              <v-text-field v-model.number="form.durationMin" label="Duration Minutes"/>
            </v-col>
            <v-col>
              <v-text-field v-model.number="form.durationLaps" label="Duration Laps"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn block color="primary" type="submit">Insert</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-dialog v-model="confirm" max-width="290" @keydown.enter="confirmed">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to submit?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="confirm = false">No</v-btn>
          <v-btn color="blue darken-1" text @click="confirmed">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "SessionForm",
  props : ['initialValue'],
  emits : ['submit'],
  data(){
    return {
      timezone : null,
      calendar1 : false,
      calendar2 : false,
      timezones : Intl.supportedValuesOf('timeZone'),
      form : this.initialValue,
      time : null,
      valid : true,
      confirm : false,
      rules : {
        required : [v=> !!v || 'this entry is required']
      }
    }
  },
  computed : {
    events(){
      return this.$store.getters["events/events"]
    }
  },
  mounted() {
    this.$store.dispatch('events/fetchAllEvents')
  },
  methods : {
    confirmed () {
      this.confirm = false
      this.$emit('submit', this.form)
    },
    onSubmit () {
      this.$refs.form.validate()
      if (this.valid) {
        this.confirm = true
      }
    },
  }
}
</script>

<style scoped>

</style>
