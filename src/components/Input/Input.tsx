import s from "./Input.module.css"
import {ChangeEvent} from "react";

type InputProps = {
    type: string
    value: number
    isValidValue: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
};
export const Input = ({type, value, isValidValue, onChange}: InputProps) => {
    return (
        <input
            className={isValidValue ? `${s.Input} ${s.isInvalidValue}` : `${s.Input}`}
            type="text"
            value={value}
            onChange={onChange}
        />
    )
};