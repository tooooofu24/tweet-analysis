import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config"
import BadgeDirective from 'primevue/badgedirective';

// css
import "primevue/resources/themes/saga-blue/theme.css" // テーマ
import "primevue/resources/primevue.min.css" // ベース
import "primeicons/primeicons.css" // アイコン
import "primeflex/primeflex.css" // primeflex

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.directive('badge', BadgeDirective);

app.mount('#app')
