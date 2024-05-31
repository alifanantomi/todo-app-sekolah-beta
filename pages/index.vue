<script setup lang="ts">
import { ref } from 'vue';

interface ITodo {
  title: string
  status: boolean
}

const todoStore = useTodoStore();

const { getTodo, addTodo: addTodoSupabase, updateTodo, deleteTodo } = todoStore
const { todos } = storeToRefs(todoStore)
const categoryStore = useCategoryStore();
const { getCategories } = categoryStore;
const { categories } = storeToRefs(categoryStore);

const selectedCategory = ref<number | null>()

const newTodo = ref<string>('')

getTodo()

const addTodo = async () => {
  if (newTodo.value.trim() !== '') {
    // todos.value.push({ title: newTodo.value, status: false })

    await addTodoSupabase(newTodo.value, selectedCategory.value)
 
    newTodo.value = ''
  }

  await getTodo()
}

const updateTodoHandler = async (id: number, status: boolean) => {
  await updateTodo(id, status)

  await getTodo()
}

const removeTodo = async (id: number) => {
  // todos.value.splice(index, 1)

  await deleteTodo(id)

  await getTodo()
}

getCategories();
</script>

<template>
  <div class="w-1/2 flex flex-col mx-auto py-4 gap-3">
    <div class="flex items-center gap-4">
      <h1 class="text-3xl font-semibold">Daftar Todo</h1>
      <NuxtLink to="/category">Add Category</NuxtLink>
    </div>
    <div class="flex gap-2">
      <input 
        v-model="newTodo" 
        class="w-full p-2 border-2 border-blue-400" 
        type="text" 
        placeholder="Tambah tugas baru"
        @keyup.enter="addTodo"
      >
      <select v-model="selectedCategory" class="px-4 bg-transparent border-2 border-blue-400">
        <option disabled selected :value="null">Select Category</option>
        <option v-for="(category, index) in categories" :key="index" :value="category.id">{{ category.name }}</option>
      </select>
      <button class="p-2 bg-blue-400 text-white" @click="addTodo">Tambah</button>
    </div>

    <!-- <div 
      class="flex gap-2 justify-between pb-2 border-b-[1px] border-gray-300" 
      v-for="(todo, index) in todos" :key="index"
    >
      <div class="flex gap-2">
        <input v-model="todo.isDone" type="checkbox" @change="updateTodoHandler(todo.id, todo.isDone)">
        <span :class="{ 'line-through': todo.isDone }">{{ todo.title }}</span>
      </div>
      <button @click="removeTodo(index)">Hapus</button>
    </div> -->

    <TodoItem
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      @update-todo="updateTodoHandler"
      @remove-todo="removeTodo"
    />
  </div>
</template>

<style></style>