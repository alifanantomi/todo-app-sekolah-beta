import { defineStore } from 'pinia'

interface ITodo {
  title: string
  status: boolean
}

export const useTodoStore = defineStore('todos', () => {
  const todos = ref<ITodo[] | null>([])

  const getTodo = async () => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error } = await useFetch<ITodo[]>('rest/v1/todos', {
      baseURL: baseUrl,
      method: 'GET',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}` 
      }
    })

    if (todos) {
      todos.value = data.value
    }
  }

  return {
    todos,
    getTodo
  }
})