<template>
  <div class="about">
    <div class="center_content">
      <div class="header">Многоликая Уфа</div>
      <div class="group_text">
        <div class="content">Названия улиц Уфы помогают увековечить память об известных личностях и исторических событиях, получивших известность в городе, стране, или во всем мире, а также отразить культурно-историческое наследие города и республики.</div>
        <br>
        <div class="content">На данном сайте вы можете изучить информацию о достижениях и подвигах личностей, чьи имена носят улицы центральных и пригородных районов города Уфы. Для этого откройте интерактивную карту и найдите интересующую вас улицу. Также посетители сайта имеют возможность ознакомиться с фотографиями выдающихся личностей.</div>
      </div>
      <div class="group_image">
        <img>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Arimo");
.center_content {
  background: rgba(253, 253, 253, 0.3);
  backdrop-filter: blur(10px);
  height: 85%;
  width: 96%;
  margin-left: 2%;
  margin-top: 30px;
  border-radius: 100px;
  position: fixed;
}
.header {
  font-family: "Playfair Display";
  position: relative;
  font-size: 50px;
  font-weight: 700;
  line-height: 107px;
  letter-spacing: 0em;
  left: 20%;
  color: #613310;
}
.content {
  font-family: "Arimo";
  font-size: 25px;
  width: 60%;
  margin-left: 4%;
  line-height: normal;
  letter-spacing: 0.08em;
  text-align: justify;
}
.group_image {
  display: flex;
}
.img {
  height: 50px;
  width: 50px;
}
</style>
