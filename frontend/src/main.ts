import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import { ApolloClients, provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo'
import PrimeVue from 'primevue/config'
import router from './router'
import App from './App.vue'
import { de } from 'primelocale/js/de.js'
import ToastService from 'primevue/toastservice';

// Aussehen der Anwendung
import './assets/main.css'
import 'primeicons/primeicons.css'
import { MyPreset } from '@/assets/MyPreset.ts'

// Verbindung zum Backends
provideApolloClient(apolloClient)

const app = createApp({
  setup() {
    provide(ApolloClients, { default: apolloClient })
  },
  render: () => h(App),
})

app.use(createPinia())
app.use(ToastService);
app.use(router)
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p',
    //   darkModeSelector: 'system',
    darkModeSelector: '.dark',
    cssLayer: false,
    },
  },
  locale: de,
})

app.mount('#app')
