<template>
  <div class="mapufa">
    <DialogStreet v-model:show="dialogVisible">
      <AddStreet :new_coords="coord" />
    </DialogStreet>
    <div class="left_area" v-if="selectedStreet===null">
      <input class="searchInput" v-model="searchQuery" placeholder="Поиск.....">
      <button></button>
      <StreetList :streets="sortedAndSearched" :persons="persons_api" @select="selectOneStreet" />  
    </div>
    <div class="another_left_area" v-else>
      <button type="submit" @click="toList">Назад</button><br>
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
import axios from 'axios';

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
      map: null
      //districts_api: []
    };
  },
  methods: {
    loadStreet() {
      axios
      .get('http://127.0.0.1:8000/api/streets/')
      .then(response => {
          //console.log('data', response.data)
          this.streets_api = response.data
          //console.log(this.streets_api)
        })
        .catch(error => {
            console.log('error', error)
        })
    },
    loadPerson() {
      axios
        .get('http://127.0.0.1:8000/api/persons/')
        .then(response => {
          this.persons_api = response.data
        })
        .catch(error => {
            console.log('error', error)
        })
    },
    showDialog() {
      this.dialogVisible = true
      console.log('Нажалось')
    },
    selectOneStreet(street) {
      this.selectedStreet = street,
      this.selectedPerson = this.persons_api.find(item => item.id == street.id_person)
      

      //this.persons_api.forEach((item, index) => {
       // if (item.id == street.id_person) this.selectedPerson=item
     // })
    },
    toList() {
      this.selectedStreet=null,
      this.selectedPerson=null
    },
    
  },
  computed: {
    sortedAndSearched() {
      return this.streets_api.filter(street => street.street_name_ru.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
    //selectedPerson() {
    //  return this.persons_api.filter(person => person.id.includes(this.selectedStreet.id_person))[0]
    //}
  },
  created() {
    this.loadStreet();
    this.loadPerson();
    
    this.map = new ymaps.ready(init.bind(this));
    console.log('map', this.map);
    function init(){
      var myMap = new ymaps.Map("map", {
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
      //var clusterer = new ymaps.Clusterer({
      //  preset: 'islands#invertedVioletClusterIcons',
        /* Ставим true, если хотим кластеризовать только точки с одинаковыми координатами. */
      //  groupByCoordinates: false,
      //  clusterDisableClickZoom: true,
      //  clusterHideIconOnBalloonOpen: false,
      //  geoObjectHideIconOnBalloonOpen: false
      //});
      var getPointData = function (name) {
            return {
                balloonContentBody: '<strong>'+ name + '</strong>',
            };
        };
      var getP = function () {
            console.log('ПоЛуЧиЛоСь');
        };
      var points = [0.0, 0.0];
      var list = this.streets_api;
      console.log('Перешло');
      //var collection = new ymaps.GeoObjectCollection(null, {preset: 'islands#circleIcon', iconColor: '#3caa3c'});
      for (var i = 0, l = list.length; i < l; i++) {
        points[0] = list[i].coordinates_0;
        points[1] = list[i].coordinates_1;
        myMap.geoObjects
        .add(new ymaps.Placemark(points, {
          balloonContent: '<strong>'+ list[i].street_name_ru +'</strong>'
          }, 
          {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
          }));  
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
      myMap.events.add('click', (e) => {
        if (!myMap.balloon.isOpen()) {
          var coords = e.get('coords');
          this.coord = coords;
          myMap.balloon.open(coords, {
            contentHeader:'Добавление метки',
            contentBody:'<p>на координаты: ' + [
              coords[0].toPrecision(6),
              coords[1].toPrecision(6)
            ].join(', ')
          });
          this.showDialog();
        }
        else {
          myMap.balloon.close();
        }
      });
    };
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
</style>
