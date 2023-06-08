<template>
    <div class="one_street">            
        <div class="name">{{ $store.state.isEng === false?street.street_name_ru:street.street_name_en }}</div>
        <div v-if="person" class="image"><img class="img" :src="person.photo" alt="Image"></div>
    </div> 
</template>

<script>
export default {
    name: "StreetItem",
    props: {
        street: {
            type: Object,
            required: true,
        },
        person: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
.one_street {
    display: flex;
    height: 70px;
    padding: 10px;
    background: rgba(253, 253, 253, 0.3);
    backdrop-filter: blur(10px);
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    font-family: 'Montserrat';
    font-size: 24px;
    margin: 5px;
}
.image {
    float:right;
}
.name {
    width: 85%;
    margin: 20px 0 0 20px;
}
.img { 
    height: 70px;
    width: 55px; 
}
</style>