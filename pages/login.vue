<template>
  <v-container>
    <v-row>
      <v-col cols="0" md="4"/>
      <v-col cols="12" md="4">
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
          <v-container>
            <v-row>
              <v-col><h1 class="text-h3">Login</h1></v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="username" :rules="rules.username" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="password" :append-icon="showPswd ? 'mdi-eye' : 'mdi-eye-off'" :rules="rules.password"
                              :type="showPswd ? 'text' : 'password'" required
                              @click:append="showPswd = !showPswd"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-btn block color="blue" type="submit">Login</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
      <v-col cols="0" md="4"/>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",
  asyncData(context) {
    return { from: context.from }
  },
  data () {
    return {
      valid: false,
      username: '',
      password: '',
      showPswd: false,
      rules: {
        username: [v => !!v || 'Username is required'],
        password: [v => !!v || 'Password is required'],
      }
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('authentication/login', {
        username: this.username,
        password: this.password
      })
        .then(() => {
          if(this.hasHistory()) {
            this.$router.back()
          } else {
            this.$router.push("/")
          }
        })
        .catch((error) => window.alert('wrong username or password'+error))
    },
    onSubmit () {
      this.$refs.form.validate()
      if (this.valid) {
        this.onLogin()
      }
    },
    hasHistory() {
      return this.from && this.from.name !== 'login'
    }
  }
}
</script>

<style scoped>

</style>
