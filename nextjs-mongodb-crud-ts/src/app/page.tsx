import * as todoService from "@/services/todo-service";
import TodoList from '@/components/TodoList';
import { FindResult } from "@/types/common-type";
import { Todo } from "@/types/todo-type";

export default async function HomePage() {

  let findResult: FindResult<Todo>;

  try {
    findResult = await todoService.find();
  } catch (error: any) {
    findResult = {
      total: 0,
      todoes: [],
      errorMessage: error.message
    }
  }

  return (
    <>
      <TodoList {...findResult} />
    </>
  )
}
