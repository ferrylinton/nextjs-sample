import { Todo } from '@/types/todo-type';
import { create } from 'zustand';

type ShowConfirmInput = {
    message: string,
    todo: Todo,
    isDelete?: boolean
}

type ConfirmState = {
    answer: boolean,
    show: boolean,
    isDelete?: boolean,
    todo?: Todo,
    message?: string,
    showConfirm: (arg: ShowConfirmInput) => void,
    cancelConfirm: () => void,
    okConfirm: () => void
}

const DEFAULT_VALUE: Partial<ConfirmState> = {
    answer: false,
    show: false,
    isDelete: undefined,
    todo: undefined,
    message: undefined,
}

export const useConfirmStore = create<ConfirmState>((set) => ({
    answer: false,
    show: false,
    showConfirm: (arg) => {
        set(() => ({ show: true, ...arg }));
    },
    cancelConfirm: () => {
        set(() => (DEFAULT_VALUE));
        console.log("cancelConfirm....");
    },
    okConfirm: () => {
        set(() => ({ ...DEFAULT_VALUE, answer: true }));
        console.log("cancelConfirm....");
    }
}));