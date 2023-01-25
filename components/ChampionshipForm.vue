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
            <v-col>
              <v-text-field v-model="form.prettyName" :rules="rules.required" label="Pretty Name" required/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model.number="form.year" :rules="rules.required" label="Year" required/>
            </v-col>
            <v-col>
              <v-text-field v-model="form.liveStream" label="Live Stream Link" required type="url"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="form.image" :rules="rules.required" label="Image Link" required type="url"/>
            </v-col>
            <v-col>
              <v-text-field v-model="form.logo" :rules="rules.required" label="Logo Link" required type="url"/>
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

export default {
  name: "ChampionshipForm",
  props : ['initialValue'],
  emits : ['submit'],
  data(){
    return {
      form : this.initialValue,
      valid : true,
      confirm : false,
      rules : {
        required : [v=> !!v || 'this entry is required'],
      }
    }
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
