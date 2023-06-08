<template>
    <div v-if="$store.state.isEng === true" class="center">
        <p class="head">Войдите в свою учетную запись</p><br>
        <p v-if="incorrectAuth" class="incorrect">Неверное имя пользователя или пароль - пожалуйста повторите снова</p>
        <form v-on:submit.prevent="login" class="form">
          <div class="field">
            <label class="label">Имя пользователя:</label><br>
            <input class="input" type="text" v-model.trim="username">
          </div>
          <div class="field">
            <label class="label">Пароль:</label><br>
            <input class="input" type="password" v-model.trim="password">
          </div>
          <button type="submit" class="btn">Войти</button>
        </form>
    </div>
    <div v-else class="center">
        <p class="head">Sign in with your account</p><br>
        <p v-if="incorrectAuth" class="incorrect">Incorrect username or password entered - please try again</p>
        <form v-on:submit.prevent="login" class="form">
          <div class="field">
            <label class="label">Username:</label><br>
            <input class="input" type="text" v-model.trim="username">
          </div>
          <div class="field">
            <label class="label">Password:</label><br>
            <input class="input" type="password" v-model.trim="password">
          </div>
          <button type="submit" class="btn">Sign in</button>
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

<style scoped>
.center {
  background: rgba(253, 253, 253, 0.4);
  backdrop-filter: blur(8px);
  margin: 25px 0 0 33%;
  height: 400px;
  width: 465px;
  border-radius: 15px;
  position: fixed;
}
.head {
  font-family: "Playfair Display";
  color: #492607;
  font-size: 36px;
  margin: 30px 0 30px 5%;
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
  margin: 20px 0 0 265px;
  background-color: rgba(253, 253, 253, 0.7);
}
.btn:hover {
  background-color:  rgba(253, 253, 253, 0.9);
}
</style>