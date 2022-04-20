<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Todos</q-toolbar-title>

    <q-btn flat round dense icon="whatshot" />
  </q-toolbar>
  <div class="q-pa-md q-gutter-sm">
    <q-input filled v-model="data.task" label="Task" @keyup.enter="add" />
    <q-list bordered separator>
      <q-item v-for="(todo, i) in data.todos" :key="todo._id" :class="{ completed: todo.isDone }">
        <q-item-section avatar>
          <q-checkbox v-model="todo.isDone" />
        </q-item-section>
        <q-item-section>{{ i }} - {{ todo.desc }}</q-item-section>
        <q-item-section side>
          <q-btn icon="delete" round @click="remove(i)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>

import { reactive } from 'vue'
import('pages/style.css')

const data = reactive({
  task: '',
  todos: []
})

function add () {
  data.todos.push({
    _id: Date.now(),
    desc: data.task,
    isDone: false
  })
  data.task = ''
}

const remove = (index) => data.todos.splice(index, 1)

</script>

<style scoped>
</style>
