import { createStore } from 'vuex'
import { API } from '@/axios-api'

export default createStore({
  //данные
  state: {
    isEng: false,
    accessToken: localStorage.getItem('access') || null,
    refreshToken: localStorage.getItem('refresh') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    count: 0,
    map:null,
    lang:'ru'
  },
  //computed
  getters: {
    loggedIn (state) {
      return state.accessToken != null
    }
  },
  //function для изменения state
  mutations: {
    set_isEng: state => {
      state.isEng = !state.isEng
    },
    updateStorage (state, {access, refresh}) {
      state.accessToken = access
      state.refreshToken = refresh
    },
    refreshToken (state, { newAccess }) {
      state.accessToken = newAccess
      console.log('newAccess', state.accessToken)
    },
    destroyToken (state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    },
    getUser (state, user) {
      state.user = user
      console.log(state.user)
    }
  },
  actions: {
    userLogin (context, usercredentials) {
            API.post('api-token/', {
                username: usercredentials.username,
                password: usercredentials.password
            }).then(response => {
                localStorage.setItem('access', response.data.access)
                localStorage.setItem('refresh',response.data.refresh)
                context.commit('updateStorage', { 
                    access: response.data.access, 
                    refresh: response.data.refresh 
                })
                //console.log(usercredentials.username)
                API.get('users/').then(response => {
                    console.log(response.data)
                    let users = response.data
                    users.forEach(u => {
                        if (u.username == usercredentials.username) {
                            //console.log('hliuu', u.username, usercredentials.username, u)
                            localStorage.setItem('user', JSON.stringify(u))
                            context.commit('getUser', {
                                user: u
                            })
                        }
                    })
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
    },
    tokenRefresh (context, refreshToken) {
      API.post('api-token-refresh/', {
          refresh: refreshToken,
      }).then(response => {
          localStorage.setItem('access', response.data.access)
          context.commit('refreshToken', { newAccess: response.data.access })
          // context.commit('getUser')
      }).catch(err => {
          console.log(err)
      })
    },
    userLogout (context) {
      if (context.getters.loggedIn) {
          localStorage.removeItem('user')
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          context.commit('destroyToken')
      }
    },
    increment() {
      this.count++
    },
    changeLang(){
      this.lang=='ru'?this.lang='en':this.lang='ru'
    }
  }
})
