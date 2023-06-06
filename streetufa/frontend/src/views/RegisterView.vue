<template>
    <div>
      <h1>Registration</h1>
      <!--<p v-if="incorrectReg">Incorrect username or password entered - please try again</p>-->
      <form v-on:submit.prevent="registration">
        <!--<div>
          <input type="text" v-model="last_name" placeholder="Last name" required>
        </div>
        <div>
          <input type="text" v-model="first_name" placeholder="First name" required>
        </div>-->
        <div>
          <input type="text" v-model="username" placeholder="Username" required>
        </div>
        <div>
          <input type="email" v-model="email" placeholder="Email" required>
        </div>
        <div>
          <input type="password" v-model="password" placeholder="Password" required>
        </div>
        <button type="submit">Registration</button>
        <div>Уже есть аккаунт? <router-link to="/login">Войдте!</router-link></div>
      </form>
    </div>
</template>

<script>
import { API } from '@/axios-api';

export default {
  name: 'RegisterView',
  data() {
      return {
          //last_name: '',
          //first_name: '',
          username: '',
          password: '',
          email: '',
          incorrectReg: false
      };
  },
  methods: {
    registration () { 
        API.post('api-register/', { 
            //first_name: this.first_name,
            //last_name: this.last_name,
            username: this.username, 
            email: this.email, 
            password: this.password
        }).then(response => {
            console.log('Registration successful', response.data)
            this.$store.dispatch('userLogin', {
                username: this.username,
                password: this.password
            }).then(() => {
                this.$router.go(-1)
                //this.$router.push({ name: 'about' })
            })
        }).catch(err => {
            console.log('error регистрация не прошла', err)
        });
        console.log('Пользователь успешно зарегистрировался');
    }
  }
}
</script>
