import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { useErrorsStore } from './stores/errors'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
    console.error(err, info)

    const errorStore = useErrorsStore()
    if (err instanceof Error) {
        errorStore.setError({
            message: err.message || 'An unexpected error occurred.',
            stack: err.stack,
            info,
        })
    } else {
        errorStore.setError({
            message: 'An unexpected error occurred.',
            stack: '',
            info,
        })
    }

    router.push({
        path: '/:pathMatch(.*)*',
        // @ts-expect-error - This is a dynamic import
        component: () => import('./404.vue'),
        meta: { layout: 'ErrorLayout' },
    })
}

app.use(createPinia())
app.use(router)

app.mount('#app')
