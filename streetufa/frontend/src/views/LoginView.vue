<template>
      <div>
        <h1>Please sign in</h1>
        <p v-if="incorrectAuth">Incorrect username or password entered - please try again</p>
        <form v-on:submit.prevent="login">
          <div>
            <input type="text" name="username" id="user" v-model="username" placeholder="Username">
          </div>
          <div>
            <input type="password" name="password" id="pass" v-model="password" placeholder="Password">
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
</template>

<script>
export default {
    name: 'LoginView',
    components: {},
    data() {
        return {
            username: '',
            password: '',
            incorrectAuth: false
        };
    },
    methods: {
        login () { 
            this.$store.dispatch('userLogin', {
                username: this.username,
                password: this.password
            }, {
              headers: {
                  'X-CSRFToken': localStorage.getItem('csrfToken')
              }
            })
            .then(() => {
                this.$router.push({ name: 'about' })
                console.log('Пользователь успешно залогинился', this.$store.state.user)
            })
            .catch(err => {
                console.log('error пользователью зайти не удалось', err)
                this.incorrectAuth = true
            })
        }
    }
}
</script>