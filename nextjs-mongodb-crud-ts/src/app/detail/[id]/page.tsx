import React from 'react';
import * as todoService from "@/services/todo-service";
import { getFormatter, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

interface Props {
  params: {
    id: string;
  };
}
export default async function DetailPage({ params }: Props) {
  const { id } = params;

  const t = await getTranslations('common');

  const formatter = await getFormatter();

  const todo = await todoService.findById(id)

  return (
    <>
      <div className="todo-detail">
        <table>
          {
            !todo && <tbody>
              {
                ["id", "task", "done", "createdAt", "updatedAt"].map((txt) => {
                  return <tr key={txt}>
                    <th>
                      {t("id")}
                    </th>
                    <td>
                      <div className="skeleton-line"></div>
                    </td>
                  </tr>
                })
              }
            </tbody>
          }
          {
            todo && <tbody>
              <tr>
                <th>{t("id")}</th>
                <td>{todo.id}</td>
              </tr>
              <tr>
                <th>{t("task")}</th>
                <td className="break">{todo.task}</td>
              </tr>
              <tr>
                <th>{t("done")}</th>
                <td>{t(todo.done ? "yes" : "no")}</td>
              </tr>
              <tr>
                <th>{t("createdAt")}</th>
                <td>{formatter.dateTime(new Date(todo.createdAt))}</td>
              </tr>
              <tr>
                <th>{t("updatedAt")}</th>
                <td>{todo.updatedAt ? formatter.dateTime(new Date(todo.updatedAt)) : '-'}</td>
              </tr>
            </tbody>
          }
        </table>
        <section className="buttons">
          <Link href={"/"} className='btn btn-secondary'>
            {t("back")}
          </Link>
          {todo && <DeleteButton todo={todo} />}

        </section>
      </div>
    </>
  )
}
