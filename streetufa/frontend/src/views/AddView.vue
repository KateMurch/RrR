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
            <input type="file" @change="fileSelected($event)">
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
import axios from 'axios';

export default {
  name: "AddView",
  components: {},
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
      //console.log('dis + pers', this.district_id, this.person_id)
      let form_data = new FormData();
      form_data.append('person_name_ru', this.name_ru);
      form_data.append('person_name_en', this.name_en);
      form_data.append('birth_date', this.birth_d);
      form_data.append('death_date', this.death_d);
      form_data.append('content_ru', this.cont_ru);
      form_data.append('content_en', this.cont_en);
      form_data.append('photo', this.image, this.image.name);

      axios
      /*.post('http://127.0.0.1:8000/api/persons/', {
          'person_name_ru': this.name_ru,
          'person_name_en': this.name_en,
          'birth_date': this.birth_d,
          'death_date': this.death_d,
          'content': this.cont,
          'photo': form_img
          'death_date': parseFloat(this.coord_2),
          'id_district': this.district_id,
          'id_person': this.person_id
        })*/
        .post('http://127.0.0.1:8000/api/persons/', form_data)
        .then(response => {
          console.log('data', response.data),
          this.name_ru = '',
          this.name_en = '',
          this.birth_d = 0,
          this.death_d = 0,
          this.cont_ru = '',
          this.cont_en = '',
          this.image = null
        })
        .catch(error => {
            console.log('error', error)
        })
      
    },
    loadPerson() {
      axios
      .get('http://127.0.0.1:8000/api/persons/')
      .then(response => {
          this.persons = response.data
          //console.log(this.persons_api)
        })
        .catch(error => {
            console.log('error', error)
        })
    },
    loadDistrict() {
      axios
      .get('http://127.0.0.1:8000/api/districts/')
      .then(response => {
          this.districts = response.data
        })
        .catch(error => {
            console.log('error', error)
        })
    },
  },
  created() {
    this.loadPerson();
    this.loadDistrict();
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
  margin-left: 30%;
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
</style>