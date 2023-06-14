<template>
    <div v-if="$store.state.isEng === false" class="center">
      <p class="head">Регистрация пользователя</p>
      <!--<p v-if="incorrectReg">Incorrect username or password entered - please try again</p>-->
      <form v-on:submit.prevent="registration" class="form">
        <!--<div>
          <input type="text" v-model="last_name" placeholder="Last name" required>
        </div>
        <div>
          <input type="text" v-model="first_name" placeholder="First name" required>
        </div>-->
        <div class="field">
          <label class="label">ФИО:</label><br>
          <input type="text" class="input" v-model.trim="username" required>
        </div>
        <div class="field">
          <label class="label">Почта:</label><br>
          <input type="email" class="input" v-model.trim="email" required>
        </div>
        <div class="field">
          <label class="label">Пароль:</label><br>
          <input type="password" class="input" v-model.trim="password" required>
        </div>
        <button type="submit" class="btn">Зарегистрироваться</button>
        <div class="sss">Уже есть аккаунт? <router-link to="/login">Войдите!</router-link></div>
      </form>
    </div>
    <div v-else class="center">
      <p class="head">User registration</p>
      <form v-on:submit.prevent="registration" class="form">
        <div class="field">
          <label class="label">Username:</label><br>
          <input type="text" class="input" v-model.trim="username" required>
        </div>
        <div class="field">
          <label class="label">Email:</label><br>
          <input type="email" class="input" v-model.trim="email" required>
        </div>
        <div class="field">
          <label class="label">Password:</label><br>
          <input type="password" class="input" v-model.trim="password" required>
        </div>
        <button type="submit" class="btn">Register</button>
        <div class="sss">Already have an account? <router-link to="/login">Log in!</router-link></div>
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
          email: ''
          //incorrectReg: false
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

<style scoped>
.center {
  background: rgba(253, 253, 253, 0.4);
  backdrop-filter: blur(8px);
  margin: 25px 0 0 33%;
  height: 480px;
  width: 470px;
  border-radius: 15px;
  position: fixed;
}
.head {
  font-family: "Playfair Display";
  color: #492607;
  font-size: 36px;
  margin: 30px 0 30px 4%;
  font-weight: 700;
  height: 40px;
}
.form {
  font-size: 18px;
  font-family: "Arimo";
  margin: 0 0 0 20px;
}
.field {
  margin-top: 20px;
}
.input {
  width: 65%;
  height: 30px;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  margin: 0 0 5px 10px;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 1px solid #2e3031;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.input::placeholder {
  color: #000000;
  opacity: 0.6;
}
.input:focus {
  background-color: transparent;
  border-bottom: 1px solid #000000;
  outline: 0;
}
.btn {
	border: none;
	border-radius: 7px;
	color: black;
	font-family: "Arimo";
  font-size: 20px;
  font-weight: 500;
	letter-spacing: .05em;
	padding: 10px 40px;
	position: relative;
  margin: 20px 20px 0 100px;
  float: right;
  background-color: rgba(253, 253, 253, 0.7);
}
.btn:hover {
  background-color:  rgba(253, 253, 253, 0.9);
}
.sss {
  margin: 20px 0 0 0;
  float: left;
}
</style>
