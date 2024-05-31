import { defineStore } from 'pinia'

interface ITodo {
  id: number
  title: string
  isDone: boolean
  category: number
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

  const addTodo = async (todo: string, category: number) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error } = await useFetch<ITodo[]>('rest/v1/todos', {
      baseURL: baseUrl,
      method: 'post',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}` 
      },
      body: {
        title: todo,
        isDone: false,
        category_id: category,
      }
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    todos.value = data.value

  }

  const updateTodo = async (id: number, status: boolean) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error } = await useFetch<ITodo[]>(`rest/v1/todos?id=eq.${id}`, {
      baseURL: baseUrl,
      method: 'patch',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}` 
      },
      body: {
        isDone: status
      }
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    todos.value = data.value
  }

  const deleteTodo = async (id: number) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error } = await useFetch<ITodo[]>(`rest/v1/todos?id=eq.${id}`, {
      baseURL: baseUrl,
      method: 'delete',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}` 
      }
    })

    if (error.value) {
      console.error(error.value)
      return
    }
  }

  return {
    todos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
  }
})