import {ChangeEvent, useState} from "react";

export const useFormInputField = (inputValue: string) => {

    const [value, setValue] = useState(inputValue);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const clear = () => {
        setValue('');
    }

    return {
        bind: {value, onChange},
        value,
        clear,
    };
}