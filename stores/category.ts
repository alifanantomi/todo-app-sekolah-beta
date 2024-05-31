interface CategoryInterface {
  id: number
  name: string
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<CategoryInterface[] | null>([])

  const getCategories = async () => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error } = await useFetch<CategoryInterface[]>('rest/v1/category', {
      baseURL: baseUrl,
      method: 'GET',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}` 
      }
    })

    if (categories) {
      categories.value = data.value
    }
  }

  const addCategory = async (category: string) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error } = await useFetch<CategoryInterface[]>('rest/v1/category', {
      baseURL: baseUrl,
      method: 'post',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}` 
      },
      body: {
        name: category,
      }
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    categories.value = data.value
  }

  return {
    categories,
    getCategories,
    addCategory
  }
})