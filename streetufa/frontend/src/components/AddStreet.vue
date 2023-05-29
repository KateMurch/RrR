<template>
    <div class="add_street">
      <form @submit.prevent="submitForm" method="post">
        <p class="head">Добавление улицы</p>
        <div class="input">
          <label class="label">Название улицы (рус. и англ.): </label>
          <input type="text" v-model.trim="name_ru" placeholder="Улица ...">
          <input type="text" v-model.trim="name_en" placeholder="... Street">
        </div>
        <div class="input">
          <label class="label">Координаты:</label>
          <input type="text" :value="new_coords[0]">
          <input type="text" :value="new_coords[1]">
        </div>
        <div class="select">
          <label class="label">Известная личность: </label>
          <select v-model="person_id">
            <option disabled value="">Выберите один из вариантов</option>
            <option v-for="person in persons" :value="person.id" :key="person.id" > {{ person.person_name_ru }} </option>
          </select>
        </div>
        <div class="select">
          <label class="label">Район: </label>
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
import axios from 'axios';

export default {
  name: "AddStreet",
  components: {},
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
      //coord_0: 0,
      //coord_1: 0,
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

      axios
        .post('http://127.0.0.1:8000/api/streets/', form_data)
        .then(response => {
          console.log('data', response.data)
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
.head {
  font-family: "Playfair Display";
  color: #492607;
  font-size: 36px;
  margin-top: 0;
  margin-left: 30%;
  font-weight: 700;
}
</style>