import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import axios from 'axios'

export default async ({ app }) => {
  // something to do
  app.use(VueChartkick)
  app.config.globalProperties.$api = axios.create({
    baseURL: 'http://localhost:3030'
  })
}
