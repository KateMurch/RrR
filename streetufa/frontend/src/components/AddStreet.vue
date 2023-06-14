<template>
    <div class="add_street">
      <form @submit.prevent="submitForm" method="post">
        <p class="head">Добавление улицы</p>
        <div class="field">
          <label class="label">Название улицы (рус. и англ.): </label><br>
          <input type="text" v-model.trim="name_ru" class="input" placeholder="Улица ...">
          <input type="text" v-model.trim="name_en" class="input" placeholder="... Street">
        </div>
        <div class="field">
          <label class="label">Координаты:</label><br>
          <input class="input" type="text" :value="new_coords[0]">
          <input class="input" type="text" :value="new_coords[1]">
        </div>
        <div class="field">
          <label class="label">Известная личность: </label><br>
          <input type="text" list="_persons" class="input" v-model="person_id">
          <datalist id="_persons" >
              <option value="">Выберите один из вариантов</option>
              <option 
                v-for="person in persons"
                :key="person.id" 
                :value="person.id"> 
                  {{person.person_name_ru}}
              </option>
          </datalist>
        </div>
        <div class="field">
          <label class="label">Район: </label><br>
          <select v-model="district_id">
            <option disabled value="">Выберите один из вариантов</option>
            <option v-for="district in districts" :value="district.id" :key="district.id" > {{ district.district_name_ru }} </option>
          </select>
        </div>
        <button type="submit" class="btn">Добавить</button>
      </form>
    </div>
</template>

<script>
//import axios from 'axios';
import { API } from '@/axios-api';
//import { mapState } from 'vuex';

export default {
  name: "AddStreet",
  props: {
    new_coords: {
        type: Array,
        required: true
    }
  },
  data() {
    return {
      name_ru: '',
      name_en: '',
      person_id: 1,
      district_id: 1,
      persons: [],
      districts: []
    };
  },
  methods: {
    submitForm() {
      let form_data = new FormData();
      form_data.append('street_name_ru', this.name_ru);
      form_data.append('street_name_en', this.name_en);
      form_data.append('coordinates_0', this.new_coords[0]);
      form_data.append('coordinates_1', this.new_coords[1]);
      form_data.append('id_district', this.district_id);
      form_data.append('id_person', this.person_id);

      API
        .post('streets/', form_data, {
          headers: {
              'Authorization': `Bearer ${this.$store.state.accessToken}`,
              'X-CSRFToken': localStorage.getItem('csrfToken')
          }
        })
        .then(response => {
          //console.log('data', response.data)
            console.log('Сохранение улицы', response.data),
            this.$router.push({ name: 'mapufa_edit' })
        })
        .catch(error => {
            console.log('error при сохранении в улицы', error)
        })    
    },
    loadPerson() {
      API
        .get('persons/')
        .then(response => {
          this.persons = response.data
        })
        .catch(error => {
            console.log('error при получении persons', error)
        })
    },
    loadDistrict() {
      API
        .get('districts/')
        .then(response => {
          this.districts = response.data
        })
        .catch(error => {
            console.log('error при получении district', error)
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
.add_street {
  font-size: 20px;
  font-family: "Arimo";
}
.field {
  margin-bottom: 10px;
}
.head {
  font-family: "Playfair Display";
  color: #311a05;
  font-size: 36px;
  margin-top: 0;
  margin-left: 23%;
  font-weight: 700;
}
.input {
  width: 65%;
  height: 25px;
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
select {
  width: 65%;
  height: 35px;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  margin: 0 0 5px 10px;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 1px solid #2e3031;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
select::placeholder {
  color: #000000;
  opacity: 0.6;
}
select:focus {
  background-color: transparent;
  border-bottom: 1px solid #000000;
  outline: 0;
}
option {
  background-color: rgb(226, 226, 226);
}
button {
	border: none;
	border-radius: 7px;
	cursor: pointer;
	color: black;
	font-family: "Arimo";
  font-size: 20px;
  font-weight: 500;
	letter-spacing: .05em;
	padding: 10px 40px;
	position: relative;
  float: right;
  background-color: rgba(253, 253, 253, 0.7);
}
datalist {
  width: 65%;
  height: 35px;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  margin: 0 0 5px 10px;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 1px solid #2e3031;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
datalist::placeholder {
  color: #000000;
  opacity: 0.6;
}
datalist:focus {
  background-color: transparent;
  border-bottom: 1px solid #000000;
  outline: 0;
}
</style>