<template>
    <div class="detail">
        <div class="street_name">{{ street.street_name_ru }}</div>
        <div class="person_name">{{ person.person_name_ru }}</div>
        <div class="person_life">{{ person.birth_date }} - {{ person.death_date }}</div>
        <div class="person_content">{{ person.content_ru }}</div>
    </div>
</template>

<script>
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
    background: rgba(34, 34, 34, 0.4);
    margin: 40px 0 0 0;
}
</style>
