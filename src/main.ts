import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { useErrorsStore } from './stores/errors'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

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
        path: '/404',
        // @ts-expect-error - This is a valid route
        component: () => import('./404.vue'),
        meta: { layout: 'ErrorLayout' },
    })
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
