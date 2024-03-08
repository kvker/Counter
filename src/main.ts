import App from './App.vue'
import {
  createSSRApp,
  provide
} from 'vue'

const globalProvide = {

}
export function createApp() {
  const app = createSSRApp(App)
  app.provide('global', globalProvide)
  return {
    app
  }
}