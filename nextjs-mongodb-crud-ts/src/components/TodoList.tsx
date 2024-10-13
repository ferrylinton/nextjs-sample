"use client";

import { TodoItem } from '@/components/TodoItem';
import { useAlertStore } from '@/hooks/alert-store';
import { FindResult } from '@/types/common-type';
import { Todo } from '@/types/todo-type';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';


export default function TodoList({ todoes, total, errorMessage }: FindResult<Todo>) {

    const t = useTranslations('common');

    const { alert } = useAlertStore();

    useEffect(() => {

        if (errorMessage) {
            alert.error(errorMessage);
        }

    }, [alert, errorMessage])

    return (
        <>
            <div className="todo-list-toolbar">
                <div className="total">
                    {t("total", { total })}
                </div>
                <Link href={"/add"} className="btn btn-primary">
                    {t("newTask")}
                </Link>
            </div>
            <div className="todo-list">
                <table>
                    <tbody>
                        {
                            todoes && todoes.length === 0 && <tr>
                                <td>
                                    {!errorMessage && <div style={{ padding: "1rem" }}>{t("noRecords")}</div>}
                                    {errorMessage && <div style={{ padding: "1rem" }}>{errorMessage}</div>}
                                </td>
                            </tr>
                        }
                        {
                            todoes && todoes.map((todo, index) => {
                                return <TodoItem
                                    key={index}
                                    index={index}
                                    todo={todo}
                                />
                            })
                        }
                        {
                            !todoes && ["1", "2", "3"].map((num) => {
                                return <tr key={num}>
                                    <td>{num}</td>
                                    <td>
                                        <span className="skeleton-line"></span>
                                        <em className="skeleton-line" style={{ width: 100 }}></em>
                                    </td>
                                    <td>
                                        <div className="action">
                                            <div className="skeleton-square"></div>
                                            <div className="skeleton-square"></div>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
