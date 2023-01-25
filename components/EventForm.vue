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
            <v-text-field v-model="form.image" :rules="rules.required" label="Image Link" required type="url"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete v-model="form.trackId" :items="tracks" :rules="rules.required" item-text="name"
                            item-value="id" label="Track" required/>
          </v-col>
          <v-col>
            <v-autocomplete v-model="form.championshipId" :items="championships" :rules="rules.required" :item-text="c => `${c.name} ${c.year}`"
                            item-value="id" label="Championship" required/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-menu ref="calendar1" v-model="calendar1" :close-on-content-click="false" :return-value.sync="form.startDate"
                    transition="scale-transition" offset-y min-width="auto">
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="form.startDate"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.startDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="calendar1 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.calendar1.save(form.startDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-menu ref="calendar2" v-model="calendar2" :close-on-content-click="false" :return-value.sync="form.endDate"
                    transition="scale-transition" offset-y min-width="auto">
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="form.endDate"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.endDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="calendar2 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.calendar2.save(form.endDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea v-model="form.description" label="Description"/>
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

import moment from "moment";

export default {
  name: "EventForm",
  props : ['initialValue'],
  emits : ['submit'],
  data(){
    return {
      calendar1 : false,
      calendar2 : false,
      form : this.initialValue,
      valid : true,
      confirm : false,
      rules : {
        required : [v=> !!v || 'this entry is required'],
      }
    }
  },
  computed : {
    championships(){
      return this.$store.getters["championships/championships"]
    },
    tracks(){
      return this.$store.getters["tracks/tracks"]
    }
  },
  mounted() {
    this.$store.dispatch("championships/fetchAllChampionships")
    this.$store.dispatch("tracks/fetchAllTracks")
  },
  methods : {
    confirmed () {
      this.confirm = false
      this.$emit('submit', this.form)
    },
    onSubmit () {
      this.$refs.form.validate()
      if (this.valid) {
        if(moment(this.form.endDate).isSameOrAfter(this.form.startDate)) {
          this.confirm = true
        }
        else {
          window.alert("End date can't be lesser than start date")
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
