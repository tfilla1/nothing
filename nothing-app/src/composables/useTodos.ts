import { Ref, ref } from 'vue';
import things from '../assets/data/todos.json';


export interface Todo {
  id: number;
  done: boolean;
  category?: 'home' | 'work' | 'future';
  priority: 1 | 2 | 3;
  task: string;
  description?: string;
}
export const newTodo = (id: number): Todo => ({
  id,
  done: false,
  category: 'home',
  priority: 1,
  task: '',
  description: ''
})

export default function useTodos() {
  const items: Ref<Todo[]> = ref(things as Todo[])

  const addTodo = (todo: Todo) => {
    items.value.push(todo)
  }
  const editTodo = (id: number, todo: Todo) => {

    const index = items.value.findIndex(t => t.id === id)

    if (index === -1) return

    items.value.splice(index, 1, todo)

  }
  const removeTodo = (id: number) => {
    items.value = items.value.filter((todo: Todo) => todo.id !== id)
  }
  const setDone = (id: number) => {
    const index = items.value.findIndex(t => t.id === id)

    items.value[index].done = !items.value.find((t) => t.id === id)!.done
  }
  return { items, addTodo, editTodo, removeTodo, setDone }

}
