<template>
  <div class="about">
    <div class="center_content">
      <div v-if="$store.state.isEng === true" class="group_text">
        <div class="header">Многоликая Уфа</div>
        <div class="content">Названия улиц Уфы помогают увековечить память об известных личностях и исторических событиях, получивших известность в городе, стране, или во всем мире, а также отразить культурно-историческое наследие города и республики.</div>
        <br>
        <div class="content">На данном сайте вы можете изучить информацию о достижениях и подвигах личностей, чьи имена носят улицы центральных и пригородных районов города Уфы. Для этого откройте интерактивную карту и найдите интересующую вас улицу. Также посетители сайта имеют возможность ознакомиться с фотографиями выдающихся личностей.</div>
      </div>
      <div v-else class="group_text">
        <div class="header">Multifaceted Ufa</div>
        <div class="content">Ufa street names can help us memorialize the prominent figures and well-known urban, country or world-wide historical events as well as reflect the historical and cultural heritage of Ufa and the Republic of Bashkortostan.</div>
        <br>
        <div class="content">The city center and the suburbs of Ufa are named after well-known people and on this site you can learn the information about their accomplishments and feats. You can find the street you are interested in with the help of the interactive map. Also, you have the opportunity to have a look at the photographs of the eminent personalities.</div>
      </div>
      <div class="group_image">
        <div>
          <img :src="pic_1" class="img">
          <img :src="pic_2" class="img">
          <img :src="pic_3" class="img">
        </div>
        <div>
          <img :src="pic_4" class="img">
          <img :src="pic_5" class="img">
          <img :src="pic_6" class="img">
        </div>
        <div>
          <img :src="pic_7" class="img">
          <img :src="pic_8" class="img">
          <img :src="pic_9" class="img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pic_1 from "../assets/about_page_1(Марина_Раскова).jpg";
import pic_2 from "../assets/about_page_2.jpg";
import pic_3 from "../assets/about_page_3(Зайнаб_Биишева).jpg";
import pic_4 from "../assets/about_page_4(Владимир_Комаров).jpg";
import pic_5 from "../assets/about_page_5(Мустай_Карим).jpg";
import pic_6 from "../assets/about_page_6.jpg";
import pic_7 from "../assets/about_page_7.jpg";
import pic_8 from "../assets/about_page_8.jpg";
import pic_9 from "../assets/about_page_9.jpg";

export default {
  name: "AboutView",
  data() {
    return {
      pic_1, pic_2, pic_3, pic_4, pic_5, pic_6, pic_7, pic_8, pic_9
    };
  },
};
</script>

<style scoped>
.center_content {
  background: rgba(253, 253, 253, 0.3);
  backdrop-filter: blur(10px);
  height: 85%;
  width: 96%;
  margin-left: 2%;
  margin-top: 30px;
  border-radius: 60px;
  position: fixed;
}
.header {
  font-family: "Playfair Display";
  position: relative;
  font-size: 50px;
  font-weight: 700;
  line-height: 107px;
  letter-spacing: 0em;
  left: 30%;
  color: #613310;
}
.content {
  font-family: "Arimo";
  font-size: 25px;
  margin-left: 4%;
  line-height: normal;
  letter-spacing: 0.08em;
  text-align: justify;
}
.group_text {
  float:left;
  width: 60%;
  margin-left: 3%;
}
.group_image {
  float: right;
  display: flex;
  width: 300px;
  margin: 4% 10% 0 0;
}
.img {
  margin-top: -4px;
  height: 155px;
  width: 115px;
}
</style>
