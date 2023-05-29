<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png" />-->
    <div class="left_content">
      <div class="content_head">Многоликая Уфа</div>
      <div class="content_one">
        <div class="picture">
          <img :src="pic_1" class="img1">
          <img :src="pic_2" class="img2">
          <img :src="pic_3" class="img3">
        </div>
        <div class="text">Узнай, в честь кого названы улицы любимого города </div>
      </div>
      <div class="content_two">
        <div class="src_map"><router-link to="/mapufa" class="aaa">показать карту</router-link></div>
      </div>      
    </div>
  </div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld.vue";
import pic_1 from "../assets/home_pic_1.png";
import pic_3 from "../assets/home_pic_2.png";
import pic_2 from "../assets/home_pic_3.png";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      pic_1, pic_2, pic_3
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Arimo");
.left_content {
  background: rgba(253, 253, 253, 0.3);
  backdrop-filter: blur(3px);
  margin: 25px 0 0 25px;
  height: 500px;
  width: 42%;
  border-radius: 15px;
}
.content_head {
  text-align: center;
  font-size: 45px;
  font-weight: bold;
  color: #492607;
  font-family: 'Playfair Display';
  padding-top: 15px;
}
.content_one {
  margin-top: 40px;
  position: relative;
}
.content_two {
  margin-top: 240px;
} 
.src_map {
  height: 150px;
  width: 46%;
  margin-left: 27%;
  background-image: url("../assets/home_map.png");
  background-size: cover;
  border-radius: 25px;
}
.aaa {
  font-weight: bold;
  color: black;
  font-size: 18px;
  font-family: 'Arimo';
  text-decoration: none;
  position: relative;
  top: 40%;
  left: 21%;
  padding: 15px;
  border: 1px solid;
  border-radius: 18px;
  background-color: rgb(255, 251, 247);
}
.text {
  width: 50%;
  float: right;
  color: #492607;
  font-family: 'Arimo';
  font-size: 28px;
  margin-top: 30px;
}
.picture {
  position: relative;
  float: left;
  top: 10px;
  left: 30px;
}
img {
  height: 130px;
  width: 100px;
}
.img1 {
  position: relative;
  margin-right: 30px; 
}
.img2 {
  position: absolute;
  left: 65px;
}
</style>
