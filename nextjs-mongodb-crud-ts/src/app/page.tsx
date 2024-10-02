import { TodoItem } from '@/components/TodoItem';
import * as todoService from "@/services/todo-service";
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';


export default async function HomePage() {

  const t = await getTranslations('common');

  const { todoes, total } = await todoService.find();


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
