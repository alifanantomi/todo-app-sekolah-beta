<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCategoryStore } from './../stores/category'
import { ref } from 'vue';

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);
const newCategory = ref<string>("");

const { getCategories, addCategory } = categoryStore;

const addCategoryHandler = async () => {
  if (newCategory.value.trim() !== '') {
    await addCategory(newCategory.value)
    newCategory.value = ''
  }
  await getCategories();
}

getCategories();
</script>


<template>
  <div class="w-1/2 mx-auto flex flex-col py-6 gap-3">
    <div class="flex items-center gap-4">
      <h1 class="text-3xl font-semibold">Add Category</h1>
      <NuxtLink to="/">To do</NuxtLink>
    </div>
    <div class="flex gap-2">
      <input v-model="newCategory" type="text" class="w-full border-2 border-blue-400 p-2" placeholder="Add Category" />
      <button class="bg-blue-400 text-white p-2" @click="addCategoryHandler">Tambah</button>
    </div>
    <ul>
      <li v-for="(category, index) in categories" :key="index" class="w-full py-2 border-b-[1px] border-gray-300">{{ category.name }}</li>
    </ul>
  </div>
</template>