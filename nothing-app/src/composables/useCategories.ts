
import categories from '@/assets/data/categories.json'
import { ref } from 'vue'

export function useCategories() {
  const allCategories = ref(categories.map((category: any) => ({
    title: category.value,
    key: category.key,
    props: {
      prependIcon: '$' + category.key
    }
  })))

  const getCategoryByKey = (key: string) => {
    return allCategories.value.find(category => category.key === key)
  }


  return {
    categories: allCategories,
    getCategoryByKey
  }
}
