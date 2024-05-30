<script lang="ts" setup>
defineProps(['todo'])
defineEmits(['update-todo', 'remove-todo'])
</script>

<template>
  <div 
      class="flex gap-2 justify-between pb-2 border-b-[1px] border-gray-300" 
    >
      <div class="flex gap-2">
        <input
          v-model="todo.isDone"
          type="checkbox"
          @change="$emit('update-todo', todo.id, todo.isDone)"
        />
        <span :class="{ 'line-through': todo.isDone }">{{ todo.title }}</span>
      </div>
      <button @click="$emit('remove-todo', todo.id)">Hapus</button>
    </div>
</template>
