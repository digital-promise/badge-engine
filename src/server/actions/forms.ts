import type { Control, FieldValues, UseFormRegister } from "react-hook-form"

export type FormState = {
    success: boolean;
    errors?: {
        message?: string;
        field?: string;
    }[];
}

export type ReactHookFormArrayFieldProps<T extends FieldValues> = {
    control: Control<T>;
    register: UseFormRegister<T>;
    parentIndex?: number;
}