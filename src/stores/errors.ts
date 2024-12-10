import { defineStore } from "pinia";

export const useErrorsStore = defineStore('errors', {
    state: () => ({
        error: null as { message: string; stack?: string; info?: string } | null,
    }),
    actions: {
        setError(error: { message: string; stack?: string; info?: string }) {
            this.error = error
        },
        clearError() {
            this.error = null
        },
    },
})