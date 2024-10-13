"use server";

import { create, deleteById, find, update } from "@/services/todo-service";
import { FindResult } from "@/types/common-type";
import { Todo } from "@/types/todo-type";
import { CreateTodoSchema } from "@/validations/TodoSchema";
import { revalidatePath } from "next/cache";

type PostFormState = {
    fieldErrors?: {
        task?: string[] | undefined;
    }
    errorMessage?: string
}

export const getTodoes = async (): Promise<FindResult<Todo>> => {
    try {
        return find();
    } catch (error: any) {
        return {
            errorMessage: error.message
        }
    }
}

export const createTodo = async (formData: FormData): Promise<PostFormState> => {

    const formState: PostFormState = {};

    const validation = CreateTodoSchema.safeParse({
        task: formData.get('task')
    });

    if (!validation.success) {
        return {
            fieldErrors: validation.error.flatten().fieldErrors
        }
    }

    try {
        await create(validation.data.task);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error on createTodo"
        return { errorMessage }
    }

    revalidatePath('/');
    return formState;
}

export const udpateTodoById = async (id: string) => {
    await update(id);
    revalidatePath('/');
}

export const deleteTodoById = async (id: string) => {
    await deleteById(id);
    revalidatePath('/')
}