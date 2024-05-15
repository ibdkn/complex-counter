import s from "./Button.module.css"

type ButtonProps = {
    title: string
    callback: () => void
    disabled?: boolean
};
export const Button = ({title, callback, disabled}: ButtonProps) => {
    const onClickHandler = () => {
        callback();
    }

    return (
        <button className={s.Button}
                onClick={onClickHandler}
                disabled={disabled}
        >
            {title}
        </button>
    )
};