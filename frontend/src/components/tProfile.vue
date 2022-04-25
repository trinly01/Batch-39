<template>
  <div class="row q-gutter-md items-center">
    <div>
      <q-avatar rounded>
        <img :src="img">
      </q-avatar>
    </div>
    <div class="col q-gutter-sm">
      <div class="text-h6">{{ name }}</div>
      <div>{{ place }}</div>
    </div>
    <div>
      <q-btn icon="chat" round @click="emit('chatClick', name)" />
    </div>
  </div>
</template>

<script setup>

defineProps({
  img: {
    type: String,
    default: 'https://cdn.quasar.dev/img/avatar.png'
  },
  name: {
    type: String,
    default: 'No name'
  },
  place: {
    type: String,
    default: 'No place'
  }
})

const emit = defineEmits(['chatClick'])

</script>
