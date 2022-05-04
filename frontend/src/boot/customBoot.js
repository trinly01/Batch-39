import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import axios from 'axios'
import wings from 'wings4'
// const wings = require('wings4').default

const app = wings('http://localhost:3030')

const todosSrvc = app.wingsService('todos')

export default async ({ app }) => {
  // something to do
  app.use(VueChartkick)
  app.config.globalProperties.$todosSrvc = todosSrvc
  app.config.globalProperties.$api = axios.create({
    baseURL: 'http://localhost:3030'
  })
}
