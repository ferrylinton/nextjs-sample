"use client"
import { udpateTodoById } from '@/actions/todo-action';
import { useAlertStore } from '@/hooks/alert-store';
import { CheckIcon } from '@/icons/CheckIcon';
import EyeIcon from '@/icons/EyeIcon';
import { useConfirmContext } from '@/providers/confirm-provider';
import { Todo } from '@/types/todo-type';
import clsx from 'clsx';
import { useFormatter, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


type Props = {
    index: number,
    todo: Todo
}

export const TodoItem = ({ index, todo }: Props) => {

    const router = useRouter();

    const format = useFormatter();

    const t = useTranslations("common");

    const { alert } = useAlertStore();

    const { setMessage, confirm } = useConfirmContext();

    const handleOnClickUpdate = async () => {
        setMessage(t("updateData"))
        const answer = await confirm();

        if (answer) {
            try {
                await udpateTodoById(todo.id as string);
                alert.success(t("dataIsUpdated", { task: todo?.task }) as string)
                router.replace("/")
            } catch (error: any) {
                console.log(error);
                alert.error(error.message);
            }

        }
    }

    return (
        <>
            <tr className={clsx(todo.done && "task-done")}>
                <td>{index + 1} </td>
                <td>
                    <span>{todo.task}</span>
                    <em>{format.dateTime(new Date(todo.createdAt))}</em>
                </td>
                <td>
                    <div className="action">
                        <button className="btn btn-primary" onClick={() => handleOnClickUpdate()}>
                            <CheckIcon />
                        </button>
                        <Link href={"/detail/" + todo.id} className="btn btn-secondary">
                            <EyeIcon />
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}
