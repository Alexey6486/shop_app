import React, {FormEvent} from "react";
import '../authCommonStyles/auth-in-up.styles.scss';
import {useFormInputField} from "../authHooks/useFormInputHook";
import {FormInput} from "../form-input/form-input.component";
import {CustomButton} from "../../custom-button/custom-button.component";

export const SignUp = () => {

    const name = useFormInputField("");
    const email = useFormInputField("");
    const password = useFormInputField("");
    const confirmPassword = useFormInputField("");

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className={'authForm'}>

            <div className={'authForm__info'}>
                <h2>New user?</h2>
                <p>Sign up with your e-mail and password:</p>
            </div>

            <form onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e)}>

                <FormInput type="text" onChange={(e) => name.bind.onChange(e)}
                           value={name.bind.value} label={"name"} required={true}/>

                <FormInput type="email" onChange={(e) => email.bind.onChange(e)}
                           value={email.bind.value} label={"email"} required={true}/>

                <FormInput type="password" onChange={(e) => password.bind.onChange(e)}
                           value={password.bind.value} label={"password"} required={true}/>

                <FormInput type="password" onChange={(e) => confirmPassword.bind.onChange(e)}
                           value={confirmPassword.bind.value} label={"confirm password"} required={true}/>

                <div className={'authFormGroup'}>
                    <CustomButton>Sign Up</CustomButton>
                </div>

            </form>
        </div>
    )
}