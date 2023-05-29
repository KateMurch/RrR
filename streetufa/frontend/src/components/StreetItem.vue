<template>
    <div class="one_street">
        <div class="name">{{ street.street_name_ru }}</div>
        <div v-if="person" class="image"><img class="img" :src="person.photo" alt="Image"></div>
    </div>
</template>

<script>
import { toRef } from 'vue'

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
        },  
    }
    //setup(props) {
        //const img = toRef(props, 'person')
    //    var img = props.person.photo

        //console.log(props.person)
    //    return {
    //        img
    //    }
    //}
}
</script>

<style scoped>
.one_street {
    display: flex;
    min-height: 50px;
    padding: 10px;
    background: rgba(253, 253, 253, 0.3);
    backdrop-filter: blur(10px);
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 1em;
    margin: 5px;
}
.image {
    float:right;
    flex-grow: 1;
}
.name {
    flex-grow: 6;
}
.img { 
    height: 60px;
    width: 50px; 
}
</style>