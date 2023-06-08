<template>
    <div class="detail">
        <div class="detail">
            <div class="top_content">
                <div v-if="person" class="top_left_content">
                    <div class="street_name">{{ $store.state.isEng === false?street.street_name_ru:street.street_name_en }}</div>
                    <div class="person_name">{{ $store.state.isEng === false?person.person_name_ru:person.person_name_en }}</div>
                    <div class="person_life">({{ person.birth_date }} - {{ person.death_date }})</div>
                </div>
                <div v-if="person" class="top_right_content">
                    <img class="img" :src="person.photo" alt="Image">
                </div>
            </div>
            <div v-if="person" class="bottom_content">
                <div class="person_content">{{ $store.state.isEng === false?person.content_ru:person.content_en }}</div>
            </div>
        </div>
    </div>
</template>

<script>
//import { useMapStore } from '../store/store';
//let {lang}= useMapStore()

export default {
    name: "PersonDetail",
    props: {
        person: {
            type: Object,
            required: true,
        },
        street: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style scoped>
.detail {
    position: fixed;
    background: rgba(253, 253, 253, 0.3);
    backdrop-filter: blur(10px);
    font-family: 'Montserrat';
    font-size: 24px;
    line-height: normal;
    text-align: left;
    width: 90%;
    margin-left: 5%;
    height: 490px; 
}
.top_content {
    min-height: 280px;
}
.top_left_content {
    float: left;
    margin: 20px 5% 0 5%;
    min-width: 220px;
    width: 50%;
}
.top_right_content {
    float: left;
    margin: 20px 5% 0 0;
    width: 35%;
}
.street_name {
    color:#492607;
}
.person_name {
    margin-top: 50px;
}
.img {
    height: 240px;
    float:right;
}
.person_content {
    margin: 0 5% 0 5%;
}
</style>
