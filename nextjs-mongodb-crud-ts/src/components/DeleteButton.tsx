"use client";

import { deleteTodoById } from '@/actions/todo-action';
import { useAlertStore } from '@/hooks/alert-store';
import { useConfirmContext } from '@/providers/confirm-provider';
import { Todo } from '@/types/todo-type';
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    todo: Todo
}

export default function DeleteButton({ todo }: Props) {

    const t = useTranslations("common");

    const router = useRouter();

    const { alert } = useAlertStore();

    const { setMessage, confirm } = useConfirmContext();

    const handleOnClickDelete = async () => {
        setMessage(t("deleteData"))
        const answer = await confirm();

        if (answer) {
            await deleteTodoById(todo.id as string);
            alert.success(t("dataIsDeleted", { task: todo.task as string }));
            router.replace("/");
        }
    }

    return (
        <button type="button" className="btn btn-danger" onClick={handleOnClickDelete}>
            {t("delete")}
        </button>
    )
}
