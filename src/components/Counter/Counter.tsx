import {Button} from "../Button/Button";
import s from "./Counter.module.css"
import {Options} from "../Options/Options";
import {ChangeEvent, useEffect, useState} from "react";

type CounterProps = {

};

export const Counter = (props: CounterProps) => {

    const [isShowSettings, setIsShowSettings] = useState(false);

    const initialMaxValue = 5;
    const zero = 0;
    const step = 1;

    const getLocalStorageNumber = (key: string, defaultValue: number) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    };
    const setLocalStorageNumber = (key: string, value: number) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const [maxValue, setMaxValue] = useState<number>(getLocalStorageNumber('maxValue', initialMaxValue));
    const [startValue, setStartValue] = useState<number>(getLocalStorageNumber('startValue', zero));
    const [resultValue, setResultValue] = useState(startValue);
    const [error, setError] = useState('');
    const [valuesChanged, setValuesChanged] = useState(false);

    const isValidMaxValue = maxValue <= startValue || maxValue < 0;
    const isValidStartValue = startValue >= maxValue || startValue < 0;
    const isMaxValue = maxValue === resultValue;
    const isStartValue = resultValue === startValue;
    const isInvalidSettingsData = error === 'Invalid value';

    useEffect(() => {
        if (maxValue <= startValue || maxValue < zero || startValue < zero) {
            setError('Invalid value');
        } else if (valuesChanged) {
            setError('Enter values and press "Set"')
        }
    }, [maxValue, startValue, valuesChanged]);

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(+e.currentTarget.value);
        setValuesChanged(true);
        if (error !== 'Invalid value') {
            setError('Enter values and press "Set"')
        }
    };

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        setStartValue(+e.currentTarget.value);
        setValuesChanged(true);
        if (error !== 'Invalid value') {
            setError('Enter values and press "Set"')
        }
    };

    const setInitialData = () => {
        setResultValue(startValue);
        setError('');
        setIsShowSettings(false);
        setLocalStorageNumber('startValue', startValue);
        setLocalStorageNumber('maxValue', maxValue);
    }

    const incrementValue = () => {
        if (resultValue < maxValue) {
            setResultValue(resultValue + step);
        }
    }

    const resetCounter = () => {
        setResultValue(startValue);
    }

    const switchSettings = () => {
        setIsShowSettings(true);
    }

    return (
        <div className="Wrapper">
            {isShowSettings ?
                (
                    <div className={s.Counter}>
                        <div className={s.Display}>
                            <Options
                                title="Max value:"
                                value={maxValue}
                                changeInputValue={changeMaxValue}
                                isValidValue={isValidMaxValue}
                            />
                            <Options
                                title="Start value:"
                                value={startValue}
                                changeInputValue={changeStartValue}
                                isValidValue={isValidStartValue}
                            />
                        </div>
                        <div className={s.Controls}>
                            <Button
                                title="set"
                                disabled={isInvalidSettingsData}
                                callback={setInitialData}
                            />
                        </div>
                    </div>
                )
                :
                (
                    <div className={s.Counter}>
                        <div className={s.Display}>
                            {error ?
                                <span
                                    className={error === 'Invalid value' ? `${s.Tooltip} ${s.InvalidData}` : s.Tooltip}>
                            {error}
                        </span>
                                :
                                <span className={isMaxValue ? `${s.Result} ${s.isMaxValue}` : `${s.Result}`}>
                            {resultValue}
                        </span>
                            }
                        </div>
                        <div className={s.Controls}>
                            <Button
                                title="inc"
                                disabled={error !== '' || isMaxValue}
                                callback={incrementValue}
                            />
                            <Button
                                title="reset"
                                disabled={error !== '' || isStartValue}
                                callback={resetCounter}
                            />
                            <Button
                                title="set"
                                callback={switchSettings}
                            />
                        </div>
                    </div>
                )}
        </div>
    );
};