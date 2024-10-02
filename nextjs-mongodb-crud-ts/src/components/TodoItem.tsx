"use client"
import { udpateTodoById } from '@/actions/todo-action';
import { CheckIcon } from '@/icons/CheckIcon';
import EyeIcon from '@/icons/EyeIcon';
import { useConfirmContext } from '@/providers/confirm-provider';
import { Todo } from '@/types/todo-type';
import clsx from 'clsx';
import { useFormatter } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


type Props = {
    index: number,
    todo: Todo
}

export const TodoItem = ({ index, todo }: Props) => {

    const router = useRouter();

    const format = useFormatter();

    const { setMessage, confirm } = useConfirmContext();

    const handleOnClickUpdate = async () => {
        setMessage("Update data?")
        const answer = await confirm();

        if(answer){
            await udpateTodoById(todo.id as string);
            router.refresh();
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
