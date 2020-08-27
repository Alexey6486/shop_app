import React, {ChangeEvent} from "react";
import '../authCommonStyles/auth-in-up.styles.scss';

type PropsType = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    label: string | null
    value: string
    required: boolean
    type: string
}

export const FormInput = (props: PropsType) => {

    const {label} = props;

    return (
        <div className={'authFormGroup'}>
            <input {...props}/>
            {
                label &&
                <label className={`${props.value.length ? 'shrink' : ''}`}>{label}</label>
            }
        </div>
    )
}