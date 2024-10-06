"use client";
import { createTodo } from '@/actions/todo-action';
import { useAlertStore } from '@/hooks/alert-store';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRef } from 'react';

export default function TodoAddForm() {

    const t = useTranslations('common');

    const ref = useRef<HTMLFormElement>(null)

    const { alert } = useAlertStore();

    const createTodoAction = async (formData : FormData) => {
        const {fieldErrors, errorMessage} = await createTodo(formData);

        if(fieldErrors?.task){
            alert.error(t(fieldErrors.task?.[0]))
        }else if(errorMessage){
            alert.error(errorMessage);
        }else{
            alert.success(t("dataIsSaved", { task: formData.get("task") as string }));
            redirect('/');
        }
    }

    return (
        <>
            <form
                ref={ref}
                action={createTodoAction}
                noValidate
                autoComplete='off'
                className="todo-form">

                <div className="form-group">
                    <label>{t("task")}</label>
                    <input
                        type="text"
                        placeholder={t("task")}
                        name='task'
                        autoComplete='off'
                        autoFocus />
                </div>
                <section className="buttons">
                    <Link href={"/"} className="btn btn-secondary">
                        {t("back")}
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        {t("save")}
                    </button>
                </section>

            </form>
        </>
    )
}
