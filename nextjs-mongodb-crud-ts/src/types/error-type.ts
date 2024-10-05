export type ErrorValidation = {
    code: string
    minimum: number
    type: string
    inclusive: boolean
    exact: boolean
    message: string
    path: string[]
}

export type PostFormState = {
    errors: {
        task?: string[],
        _form?: string[],
    }
}