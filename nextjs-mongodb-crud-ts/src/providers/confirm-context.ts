import { createContext } from "react";

export type ConfirmContextData = {
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    confirm: () => Promise<boolean>
};

const DEFAULT_VALUE: ConfirmContextData = {
    setMessage: () => { },
    confirm: () => new Promise<boolean>(() => { })
};

export const ConfirmContext = createContext<ConfirmContextData>(DEFAULT_VALUE);