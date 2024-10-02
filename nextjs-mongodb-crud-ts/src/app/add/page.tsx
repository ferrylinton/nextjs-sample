import { createTodo } from '@/actions/todo-action'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

export interface ErrorValidation {
  code: string
  minimum: number
  type: string
  inclusive: boolean
  exact: boolean
  message: string
  path: string[]
}

export default function AddPage() {

  const t = useTranslations('common');

  return (
    <form
      action={createTodo}
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
  )
}
