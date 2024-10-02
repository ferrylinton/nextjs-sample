"use server";

import { create, update, deleteById } from "@/services/todo-service";
import { redirect } from "next/navigation";

export const createTodo = async (formData: FormData) => {
    const task = formData.get('task');
    await create(task as string);
    redirect('/')
}

export const udpateTodoById = async (id: string) => {
    return await update(id);
}

export const deleteTodoById = async (id: string) => {
    return await deleteById(id);
}