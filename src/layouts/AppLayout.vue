<template>
    <component :is="route.meta.layoutComponent">
        <slot />
    </component>
</template>

<script lang="ts">
export default {
    name: 'AppLayout',
    props: {
        route: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>