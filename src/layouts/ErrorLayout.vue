<template>
    <div class="tw-bg-gradient-to-b tw-from-slate-200 tw-to-green-800 ">
        <slot/>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ErrorLayout',
    props: {
        route: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>