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
    <q-input filled v-model="text" label="Filled" />
    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="signal_wifi_off" />
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="signal_wifi_off" />
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
