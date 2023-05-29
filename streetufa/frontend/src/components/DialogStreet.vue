<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog_content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DialogStreet',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    }
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    z-index: 10;
}
.dialog_content {
    margin: auto auto auto 1%;
    background: rgba(253, 253, 253, 0.7);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    height: 400px;
    width: 40%;
    padding: 2% 1%;
}
</style>
