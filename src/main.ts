import { createApp } from 'vue'
import { createPinia } from 'pinia'

import enUS from '@kangc/v-md-editor/lib/lang/en-US';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

VueMarkdownEditor.lang.use('en-US', enUS);


import App from './App.vue'
import router from "./router"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(VueMarkdownEditor).mount('#app')
