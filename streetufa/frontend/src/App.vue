<template>
  <nav class="top-menu">
    <div class="menu-main">
      <router-link to="/" class="left-item">{{$store.state.isEng===false?'Главная':'Home'}}</router-link>
      <router-link v-if="accessToken!=null" to="/about" class="left-item">{{$store.state.isEng===false?'О сайте':'About'}}</router-link>
      <router-link v-if="accessToken!=null" to="/mapufa" class="left-item">{{$store.state.isEng===false?'Интерактивная карта':'InterActive Map'}}</router-link>
      <router-link v-if="(accessToken!=null)&&(user!=null)&&(user.usermodel.role===1)" to="/mapufa_edit" class="left-item">{{$store.state.isEng===false?'Редактор карты':'Map Editor'}}</router-link>
      <router-link v-if="(accessToken!=null)&&(user!=null)&&(user.usermodel.role===1)" to="/addmark" class="left-item">{{$store.state.isEng===false?'Добавить известную личность':'Add Famous People'}}</router-link>
      <button class="right-item lang" @click="$store.commit('set_isEng')">RU-EN</button>
      <div v-if="accessToken==null">
        <router-link to="/login" class="right-item">{{$store.state.isEng===false?'Авторизоваться':'Log in'}}</router-link>
        <router-link to="/register" class="right-item">{{$store.state.isEng===false?'Зарегистрироваться':'Sign up'}}</router-link>
      </div>
      <div v-else>
        <router-link to="/logout" class="right-item">{{$store.state.isEng===false?'Выйти':'Log out'}}</router-link>
        <div class="name right-item">{{user.username}}</div>
      </div>
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
  //computed: mapState(['lang']), 
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
}
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
.name {
  display: block;
  line-height: 40px;
  padding: 0 20px;
  font-size: 20px;
  letter-spacing: 2px;
  font-family: "Arimo", sans-serif;
  color: #251302;
  transition: 0.3s linear;
  height: 40px;
  font-weight: lighter;
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
</style>
