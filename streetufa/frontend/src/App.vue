<template>
  <nav class="top-menu">
    <div v-if="$store.state.isEng === true" class="menu-main">
      <div ></div>
      <router-link to="/" class="left-item">Главная</router-link>
      <router-link to="/about" class="left-item">О сайте</router-link>
      <router-link to="/mapufa" class="left-item">Интерактивная карта</router-link>
      <div v-if="user!=null"><router-link v-if="user.usermodel.role===1" to="/addmark" class="left-item">Добавить известную личность</router-link></div>
      <!--<li class="right-item"><a href="">Авторизоваться</a></li>-->
      <button class="right-item lang" @click="$store.commit('set_isEng')">RU-EN</button>
      <div>
        <router-link v-if="accessToken==null" to="/login" class="right-item">Войти</router-link>
        <router-link v-else to="/logout" class="right-item">Выйти</router-link>
      </div>
    </div>
    <div v-else class="menu-main">
      <router-link to="/" class="left-item">Home</router-link>
      <router-link to="/about" class="left-item">About website</router-link>
      <router-link to="/mapufa" class="left-item">Interactive map</router-link>
      <router-link v-if="(user!=null)&&(user.usermodel.role===1)" to="/addmark" class="left-item">Add prominent figures</router-link>
      <button class="right-item lang" @click="$store.commit('set_isEng')">RU-EN</button>
      <div>
        <router-link v-if="accessToken==null" to="/login" class="right-item">Log In</router-link>
        <router-link v-else to="/logout" class="right-item">Log out</router-link>
      </div>
      <!--<button @click="console.log('user', user)">f</button>
      <li class="right-item"><a href="">Авторизоваться</a></li> v-if="(user!=null)&&(user.usermodel.role===1)"-->
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script>
//import axios from 'axios';
  import { mapState } from 'vuex'
  import { API } from '@/axios-api'

export default {
  name: "App",
  computed: mapState(['accessToken', 'user']),
  created() {
      document.addEventListener('DOMContentLoaded', function () {
          API.get('api-get-token/').then(response => {
              console.log('get-token прошел успешно в App.vue', response.data)
              localStorage.setItem('csrfToken', response.data.token)
              API.defaults.headers.common['X-CSRFToken'] = response.data.token
          }).catch(err => {
              console.log('error при получении токена в App', err)
          })
      })
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Arimo");
.top-menu {
  position: relative;
  background: rgba(253, 253, 253, 0.3);
  backdrop-filter: blur(10px);
}
.menu-main {
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;
}
.menu-main:after {
  content: "";
  display: table;
  clear: both;
}
.left-item {
  float: left;
}
.right-item {
  float: right;
}
.menu-main a {
  text-decoration: none;
  display: block;
  line-height: 40px;
  padding: 0 20px;
  font-size: 22px;
  letter-spacing: 2px;
  font-family: "Arimo", sans-serif;
  color: #492607;
  transition: 0.3s linear;
  cursor: pointer;
}
.menu-main a:hover {
  background: rgba(253, 253, 253, 0.4);
}
.lang {
  text-decoration: none;
  display: block;
  line-height: 40px;
  padding: 0 20px;
  font-size: 22px;
  letter-spacing: 2px;
  font-family: "Arimo", sans-serif;
  color: #492607;
  transition: 0.3s linear;
  border: 0;
  background-color: transparent;
}
.lang:hover {
  background: rgba(253, 253, 253, 0.4);
}
/*@media (max-width: 830px) {
  .menu-main {
    padding-top: 90px;
    text-align: center;
  }
  .menu-main li {
    float: none;
    display: inline-block;
  }
  .menu-main a {
    line-height: normal;
    padding: 20px 15px;
    font-size: 16px;
  }
} */
</style>
