<template>
    <div class="add">
      <form @submit.prevent="submitForm" method="post">
        <p class="head">Добавление</p>
        <div class="left_content">
          <div class="field">
            <label class="label">ФИО известной личности (рус. и англ.): </label><br>
            <input class="input" type="text" v-model.trim="name_ru" placeholder="Имя Отчество Фамилия">
            <input class="input" type="text" v-model.trim="name_en" placeholder="Name Surname Middle_name">
          </div>
          <div class="field">
            <label class="label">Годы жизни:</label><br>
            <input class="input_num" type="text" v-model.number.trim="birth_d" placeholder="Год рождения">-
            <input class="input_num" type="text" v-model.number.trim="death_d" placeholder="Год смерти">
          </div>
          <div class="field">
            <label class="label">Изображение:</label><br>
            <input class="file" type="file" @change="fileSelected($event)">
          </div>
        </div>
        <div class="right_content">
          <div class="field">
            <label class="label">Краткие сведения:</label><br>
            <textarea class="textarea" rows="6" cols="45" v-model="cont_ru" placeholder="На русском"></textarea><br>
            <textarea class="textarea" rows="6" cols="45" v-model="cont_en" placeholder="In English"></textarea>
          </div>
          <button type="submit" class="btn">Добавить</button>
        </div>
      </form>
    </div>
</template>

<script>
//import axios from 'axios';
import { API } from '@/axios-api';

export default {
  name: "AddView",
  data() {
    return {
      name_ru: '',
      name_en: '',
      birth_d: 0,
      death_d: 0,
      cont_ru: '',
      cont_en: '',
      image: null
    };
  },
  methods: {
    fileSelected(event) {
      this.image = event.target.files[0];
      console.log(this.image);
    },
    submitForm() {
      let form_data = new FormData();
      form_data.append('person_name_ru', this.name_ru);
      form_data.append('person_name_en', this.name_en);
      form_data.append('birth_date', this.birth_d);
      form_data.append('death_date', this.death_d);
      form_data.append('content_ru', this.cont_ru);
      form_data.append('content_en', this.cont_en);
      form_data.append('photo', this.image, this.image.name);

      API
        .post('persons/', form_data, {
          headers: {
              'Authorization': `Bearer ${this.$store.state.accessToken}`,
              'X-CSRFToken': localStorage.getItem('csrfToken')
          }
        })
        .then(response => {
          this.name_ru = '',
          this.name_en = '',
          this.birth_d = 0,
          this.death_d = 0,
          this.cont_ru = '',
          this.cont_en = '',
          this.image = null
        })
        .catch(error => {
          console.log('error при сохранении person в AddView', error)
        })
    },
  },
}
</script>

<style scoped>
.add {
  background: rgba(253, 253, 253, 0.4);
  backdrop-filter: blur(8px);
  margin: 25px 0 0 10%;
  height: 540px;
  width: 80%;
  border-radius: 15px;
  position: fixed;
}
.left_content {
  float: left;
  font-size: 20px;
  margin: 0 20px 0 20px;
  font-family: "Arimo";
}
.right_content {
  float: right;
  font-size: 20px;
  margin: 0 20px 0 20px;
  font-family: "Arimo";
}
.head {
  font-family: "Playfair Display";
  color: #492607;
  font-size: 36px;
  margin: 30px 0 30px 39%;
  font-weight: 700;
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
.input_num {
  width: 10%;
  height: 30px;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  margin: 0 10px 5px 10px;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 1px solid #2e3031;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.input_num::placeholder {
  color: #000000;
  opacity: 0.6;
}
.input_num:focus {
  background-color: transparent;
  border-bottom: 1px solid #000000;
  outline: 0;
}
.textarea {
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 1px solid #2e3031;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.textarea::placeholder {
  color: #000000;
  opacity: 0.6;
}
.textarea:focus {
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
  float: right;
  background-color: rgba(253, 253, 253, 0.7);
  margin-top: 64px;
}
.btn:hover {
  background-color:  rgba(253, 253, 253, 0.9);
}
.file {
  margin-top: 10px;
	color: black;
	font-family: "Arimo";
  font-size: 16px;
  font-weight: 500;
	letter-spacing: .05em;
	padding: 5px 8px;
}
</style>