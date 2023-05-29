<template>
    <div class="list">
        <StreetItem v-for="street_one in streets" :key="street_one.id" :street="street_one" :person="getPerson(street_one)" @click="selectedStreet(street_one)" />
        <!--<StreetItem :streets="streets_api" />-->
    </div>
</template>

<script>
import StreetItem from "@/components/StreetItem";

export default {
    name: "StreetList",
    components: {
        StreetItem
    },
    props: {
        streets: {
            type: Array,
            required: true,
        },
        persons: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            //selectedStreet: null
        }
    },
    methods: {
        selectedStreet(street) {
            //console.log(street),
            this.$emit('select', street)
        },
        getPerson(street) {
            return this.persons.find(item => item.id == street.id_person)
        }
    },
    computed: {
        
    }
}
</script>

<style scoped>
.list {
    overflow-y: scroll;
}
.list::-webkit-scrollbar {
  width: 12px;
}
.list::-webkit-scrollbar-track {
  background: rgba(34, 34, 34, 0.1);
}
.list::-webkit-scrollbar-thumb {
  background-color: rgba(34, 34, 34, 0.8);
  border-radius: 20px;
  border: 2px solid rgba(34, 34, 34, 0.1);
}
</style>