<template>
    <div class="tw-flex tw-w-full tw-min-h-screen tw-flex-col tw-gap-14 tw-items-center tw-justify-center">
        <div class="tw-text-4xl tw-font-bold tw-text-red-800 mb-5">
            <p>{{ error?.message }}</p>
        </div>

        <pre v-if="error?.stack">{{ error.stack }}</pre>
        <pre
            v-if="error?.info"
            class="tw-flex tw-items-center tw-justify-center tw-w-full tw-text-center tw-whitespace-pre-wrap"
            >
            {{ error.info.toString() }}
        </pre>

        <button @click="goHome" class="tw-bg-blue-400 tw-p-5 tw-rounded-lg tw-mt-10 tw-text-white">Go Back to Home</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useErrorsStore } from './stores/errors';

const errorStore = useErrorsStore()
const error = errorStore.error
const router = useRouter()

if(!error) {
  router.back()
}

const goHome = () => {
  errorStore.clearError()
  router.push('/')
}
</script>

<style scoped>

</style>