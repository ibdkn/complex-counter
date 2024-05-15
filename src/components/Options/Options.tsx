import s from "./Options.module.css"
import {Input} from "../Input/Input";
import {ChangeEvent} from "react";

type OptionsProps = {
    title: string
    value: number
    changeInputValue: (e: ChangeEvent<HTMLInputElement>) => void
    isValidValue: boolean
};
export const Options = ({title, value, changeInputValue, isValidValue}: OptionsProps) => {
    return (
        <div className={s.Options}>
            <span className={s.OptionText}>{title}</span>
            <Input type="number" value={value} onChange={changeInputValue} isValidValue={isValidValue}/>
        </div>
    );
};