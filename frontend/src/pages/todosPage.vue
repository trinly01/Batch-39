<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Todos {{ data.task }}</q-toolbar-title>

    <q-btn flat round dense icon="whatshot" />
  </q-toolbar>
  <div class="q-pa-md q-gutter-sm">
    <t-profile name="kristian" place="Cubao, QC, PH" />
    <q-input filled v-model="data.task" label="Task" @keyup.enter="add" /> <q-btn @click="clear">clear</q-btn>
    <q-list bordered separator>
      <q-item v-for="(todo, i) in data.todos" :key="todo._id" :class="{ completed: todo.isDone }">
        <q-item-section avatar>
          <q-checkbox v-model="todo.isDone" />
        </q-item-section>
        <q-item-section v-show="data.changing === i">
          <q-input ref="changeInput" filled v-model="data.change" @blur="data.changing = -1" @keyup.esc="data.changing = -1" @keyup.enter="todo.desc = data.change, data.change = '', data.changing = -1" />
        </q-item-section>
        <q-item-section v-show="data.changing !== i" @dblclick="edit(i)">{{ todo.desc }}</q-item-section>
        <q-item-section side>
          <q-btn icon="delete" round @click="remove(i)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import tProfile from 'components/tProfile.vue'

import { reactive, ref } from 'vue'
import('pages/style.css')
const changeInput = ref(null)

const data = reactive({
  task: '',
  todos: []
})

// const log = console.log

function add () {
  data.todos.push({
    _id: Date.now(),
    desc: data.task,
    isDone: false,
    changing: -1,
    change: ''
  })
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

const remove = (index) => data.todos.splice(index, 1)

</script>

<style scoped>
</style>
