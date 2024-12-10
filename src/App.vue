<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue';
</script>

<template>
  <AppLayout :route="$route">
    <RouterView />
  </AppLayout>
</template>

<style scoped>

</style>
