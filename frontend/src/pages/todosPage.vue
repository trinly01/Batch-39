<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Todos {{ data.task }}</q-toolbar-title>

    <q-btn v-if="data.user" flat round dense icon="person" @click="$wings.logout()" />
    <q-btn v-else flat round dense icon="login" @click="login" />
  </q-toolbar>
  <div class="q-pa-md q-gutter-sm">
    <q-input filled v-model="data.task" label="Task" @keyup.enter="add" /> <q-btn @click="clear">clear</q-btn>
    <q-list bordered separator>
      <q-item v-for="(todo, i) in data.todos" :key="todo._id" :class="{ completed: todo.isDone }">
        <q-item-section avatar>
          <q-checkbox :modelValue="todo.isDone" @click="update(todo)" />
        </q-item-section>
        <q-item-section v-show="data.changing === i">
          <q-input ref="changeInput" filled v-model="data.change" @blur="data.changing = -1" @keyup.esc="data.changing = -1" @keyup.enter="updateDescription(todo)" />
        </q-item-section>
        <q-item-section v-show="data.changing !== i" @dblclick="edit(i)">{{ todo.desc }}</q-item-section>
        <q-item-section side>
          <q-btn icon="delete" round @click="remove(i, todo._id)" />
        </q-item-section>
      </q-item>
    </q-list>
    <pie-chart :donut="true" :data="[['Completed', completed], ['Active', active]]"></pie-chart>
    <t-profile name="kristian" place="Cubao, QC, PH" @chatClick="chat" />
    <t-profile img="https://i.pravatar.cc/" name="Riz" place="Cainta Rizal, PH" @chatClick="chat" />
    <t-profile img="https://i.pravatar.cc/" name="Lex" place="Silang Cavite" @chatClick="chat" />
  </div>
</template>

<script setup>

import tProfile from 'components/tProfile.vue'
import { reactive, ref, computed, getCurrentInstance, onMounted } from 'vue'
import { Dialog } from 'quasar'

import('pages/style.css')
const changeInput = ref(null)
// const { appContext: { config: { globalProperties: { $api, $todosSrvc, $wings } } } } = getCurrentInstance()
const { $api, $todosSrvc, $wings } = getCurrentInstance().appContext.config.globalProperties

onMounted(async () => {
  // const { data: { data: todos } } = (await $api.get('/todos'))
  // data.todos = todos.map(todo => ({ ...todo, desc: todo.task }))

  $wings.authenticate()

  $wings.on('login', (result) => {
    console.log(result)
    data.user = result.user
    $todosSrvc.reset()
    $todosSrvc.init()

    console.log($api)

    $api.defaults.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem('http://localhost:3030-jwt')
  })

  $wings.on('logout', () => {
    data.user = null
    data.todos = []
    delete $api.defaults.headers.common.Authorization
  })

  $todosSrvc.on('dataChange', (messages) => {
    console.log(messages)
    data.todos = messages.map(todo => ({ ...todo, desc: todo.task }))
  })
  $todosSrvc.init()

  console.log(data.todos)
})

const data = reactive({
  user: null,
  task: '',
  todos: []
})

// const log = console.log

const completed = computed(() => data.todos.filter(t => t.isDone).length)
const active = computed(() => data.todos.length - completed.value)

async function update (todo) {
  // await $api.patch('/todos/' + todo._id, {
  //   isDone: !todo.isDone
  // })
  await $todosSrvc.patch(todo._id, {
    isDone: !todo.isDone
  })
  todo.isDone = !todo.isDone
}

async function updateDescription (todo) {
  // const result = await $api.patch('/todos/' + todo._id, {
  //   task: data.change
  // })
  await $todosSrvc.patch(todo._id, {
    task: data.change
  })
  // console.log(result)
  todo.desc = data.change
  data.change = ''
  data.changing = -1
}

function chat (name) {
  Dialog.create({
    title: 'Chat',
    message: 'Hello ' + name
  })
}

async function add () {
  // data.todos.push({
  //   _id: Date.now(),
  //   desc: data.task,
  //   isDone: false,
  //   changing: -1,
  //   change: ''
  // })
  // (await $api.post('/todos', {
  //   task: data.task,
  //   isDone: false
  // }))
  await $todosSrvc.create({
    task: data.task,
    isDone: false
  })
  // console.log('result', result.data)
  // const todo = result.data
  // data.todos.push({ ...todo, desc: todo.task })
  data.task = ''
}

function edit (i) {
  data.changing = i
  data.change = data.todos[i].desc
  console.log(changeInput)
  setTimeout(() => {
    changeInput.value[i].select()
  }, 200)
}

function clear () {
  // clear all todos with isDone value of true
  // data.todos = []
  data.todos = data.todos.filter(t => !t.isDone)
  // data.todos = data.todos.filter(function (t) {
  //   return t.isDone === true
  // })
}

const remove = (index, _id) => {
  $api.delete('/gawain/' + _id)
  data.todos.splice(index, 1)
}

const login = async () => {
  await $wings.authenticate({
    email: 'pogi@pogi.com',
    password: 'pogi@pogi.com',
    strategy: 'local'
  })
}

</script>

<style scoped>
</style>
