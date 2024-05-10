import { createApp } from 'vue'

import './assets/style.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { uk } from 'vuetify/locale'

// Icon font
import '@mdi/font/css/materialdesignicons.css'
import DayJsAdapter from '@date-io/dayjs'

// Localization
import ukUA from 'dayjs/locale/uk'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  locale: {
    locale: 'uk',
    messages: { uk }
  },
  date: {
    adapter: DayJsAdapter,
    locale: {
      uk: ukUA
    }
  },
  icons: {
    defaultSet: 'mdi'
  },
  components,
  directives
})

createApp(App).use(vuetify).mount('#app')
