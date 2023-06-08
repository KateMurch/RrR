<template>
    <div class="mapufa">
      <DialogStreet v-model:show="dialogVisible">
        <AddStreet :new_coords="coord" />
      </DialogStreet>
      <div class="left_area" v-if="selectedStreet===null">
        <input v-if="$store.state.isEng === false" v-model="searchQuery" class="searchInput" placeholder="Поиск.....">
        <input v-else v-model="searchQuery" class="searchInput" placeholder="Search.....">
        <StreetList :streets="sortedAndSearched" :persons="persons_api" @select="selectOneStreet" />  
      </div>
      <div class="another_left_area" v-else>
        <button v-if="$store.state.isEng === false" class="btn" type="submit" @click="toList">
          <img :src="strelka" class="img">
          Назад
        </button>
        <button v-else class="btn" type="submit" @click="toList">
          <img :src="strelka" class="img">
          Back
        </button>
        <br>
        <PersonDetail :person="selectedPerson" :street="selectedStreet"/>
      </div>
      <div class="map" id="map"></div>
    </div>
</template>

<script>
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    
import StreetList from "@/components/StreetList";
import DialogStreet from "@/components/DialogStreet";
import AddStreet from "@/components/AddStreet";
import PersonDetail from "@/components/PersonDetail";
import { API } from '@/axios-api';
import strelka from "../assets/str_1.png";
//import axios from 'axios';

export default {
  name: "MapView",
  components: {
    StreetList, DialogStreet, AddStreet, PersonDetail
  },
  data() {
    return {
      streets_api: [],
      persons_api: [],
      coord: [],
      myMap: null,
      dialogVisible: false,
      searchQuery: '',
      selectedStreet: null,
      selectedPerson: null,
      language:'ru',
      strelka
    };
  },
  methods: {
    async loadStreet() {
/*       axios
      .get('http://127.0.0.1:8000/api/streets/')
      .then(response => {
          //console.log('data', response.data)
          this.streets_api = response.data
          //console.log(this.streets_api)
        })
        .catch(error => {
            console.log('error', error)
        }) */
      const response = await API.get('streets/')
      this.streets_api = response.data
    },
    async loadPerson() {
/*       axios
        .get('http://127.0.0.1:8000/api/persons/')
        .then(response => {
          this.persons_api = response.data
        })
        .catch(error => {
            console.log('error', error)
        }) */
      const response=await API.get('persons/') 
      this.persons_api=response.data  
    },
    async getData(){
     await this.loadStreet()
     await this.loadPerson()
    },
    showDialog() {
      this.dialogVisible = true
    },
    async selectOneStreet(street) {
      this.selectedStreet = street,
      this.selectedPerson = this.persons_api.find(item => item.id == street.id_person)

      console.log('Данные об улице ', street)
      await this.map.panTo([street.coordinates_0, street.coordinates_1],{
        delay: 500,
        duration: 1000,
        flying: true,
        timingFunction: 'ease-in-out'
      })         
      this.map.setZoom(14, {duration: 1000}) 
    },
    toList() {
      this.selectedStreet=null,
      this.selectedPerson=null
    },
    //async btnhandler(){
/*       await this.map.panTo([54.71128013350515, 55.9635348183663],{
            delay: 500,
            duration: 1000,
            flying: true,
            timingFunction: 'ease-in-out'
      })         
      this.map.setZoom(14, {duration: 1000})  */
     // alert(this.appData.lang)
    //}
  },
  computed: {
    sortedAndSearched() {
      return this.streets_api.filter(street => street.street_name_ru.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  //watch:{
  //  lang:{
  //    handler(){
  //      this.language=this.lang
  //      this.streets_api.filter(item=>true)
  //      console.log('изменения в mapView', this.language)
  //    },
  //    deep:true
  //  }
  //},
  async mounted() {
    //console.log('Раскладка', $store.state.isEng)
    await this.getData()
   /*     console.log('street_api',this.streets_api)
    console.log('street_api',this.persons_api)
      */  
    ymaps.ready(init.bind(this));
    function init(){
      this.map = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        center: [54.735152, 55.958736],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 12
      }, 
      {
        searchControlProvider: 'yandex#search'
      });

      // загружаем созданные точки
      console.log('Создание точек ', this.streets_api);
      var points = [0.0, 0.0];
      var list = this.streets_api;

      //var collection = new ymaps.GeoObjectCollection(null, {preset: 'islands#circleIcon', iconColor: '#3caa3c'});
      for (var i = 0, l = list.length; i < l; i++) {
        points[0] = list[i].coordinates_0;
        points[1] = list[i].coordinates_1;
/*         Placemark.events.add('click', (e)=>{
            this.
        }) */


          let Placemark= new ymaps.Placemark(points, {
            street_name:list[i].street_name_ru,
            balloonContent: `
              <strong> ${list[i].street_name_ru} </strong> 
            `
            }, 
              /* {
              preset: 'islands#circleIcon',
              iconColor: '#3caa3c'
            } */  
            {
              // Опции.
              // Необходимо указать данный тип макета.
              iconLayout: 'default#image',
              // Своё изображение иконки метки.
              iconImageHref:require('@/assets/icon30x30.png'),
              // Размеры метки.
              iconImageSize: [25, 25],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [-5, -38]
          }) 
          Placemark.events.add('click', (e)=>{
              console.log('event ', e.originalEvent.target.properties._data.street_name)
              this.searchQuery=e.originalEvent.target.properties._data.street_name
          })

          Placemark.events.add('balloonclose', (e)=>{
              this.searchQuery=''
          })
        this.map.geoObjects.add(Placemark);  
      };


      //myMap.geoObjects.add(collection);
      //console.log(list);
      //var geoObjects = [];
      //for(var i = 0, len = this.streets_api.length; i < len; i++) {
      //  var points = [,]
      //  geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
      //}
      //var points = [0.0, 0.0];
      //this.streets_api.forEach(element => {
      //  points[0] = element.coordinates_0
      //  points[1] = element.coordinates_1
      //  geoObjects.push(new ymaps.Placemark(points, getPointData(element.street_name_ru), getPointOptions()))
      //});
      
      /*myMap.geoObjects
        .add(new ymaps.Placemark([54.719310, 56.007928], {
          balloonContent: '<strong>Улица</strong>'
          }, 
          {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
          })); */    
/*       this.map.events.add('click', (e) => {
        if (!this.map.balloon.isOpen()) {
          var coords = e.get('coords');
          this.coord = coords;
          this.map.balloon.open(coords, {
            contentHeader:'Добавление метки',
            contentBody:'<p>на координаты: ' + [
              coords[0].toPrecision(6),
              coords[1].toPrecision(6)
            ].join(', ')
          });
          this.showDialog();
        }
        else {
          this.map.balloon.close();
        }
      });   */

  /*     this.map.events.add('click', (e)=>{
          if (!this.map.balloon.isOpen()) {
          var coords = e.get('coords');
          this.coord = coords;
          this.map.balloon.open(coords, {
            contentHeader:'Добавление метки',
            contentBody:'<p>на координаты: ' + [
              coords[0].toPrecision(6),
              coords[1].toPrecision(6)
            ].join(', ')
          });
          this.showDialog();
          }
          else {
            this.map.balloon.close();
          }
      }) */

    }; 
   /*  }) */

  },
} 
</script>

<style scoped>
.map {
    margin-right: 0em;
    margin-left: auto;
    margin-top: 25px;
    width: 55%;
    height: 550px;
}
.left_area {
  background: rgba(253, 253, 253, 0.3);
  backdrop-filter: blur(10px);
  margin: 0 0 0 0;
  height: 550px;
  width: 44%;
  float: left;
  position:fixed;
  overflow: auto;
}
.another_left_area {
  background: rgba(253, 253, 253, 0.3);
  backdrop-filter: blur(10px);
  margin: 0 0 0 0;
  height: 550px;
  width: 44%;
  float: left;
  position:fixed;
}
.searchInput {
  width: 44%;
  height: 30px;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  margin: 0 0 5px 10px;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 1px solid #2e3031;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.searchInput::placeholder {
  color: #000000;
  opacity: 0.6;
}
.searchInput:focus {
  background-color: transparent;
  border-bottom: 1px solid #000000;
  outline: 0;
}
.btn {
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
  background-color: transparent;
}
.img {
  height: 22px;
  width: 22px;
  margin-bottom: -4px;
}
</style>
