import React, {FormEvent} from "react";
import '../authCommonStyles/auth-in-up.styles.scss';
import {useFormInputField} from "../authHooks/useFormInputHook";
import {FormInput} from "../form-input/form-input.component";
import {CustomButton} from "../../custom-button/custom-button.component";
import {useDispatch} from "react-redux";
import { initSagaSignUp } from "../../../redux/user/user.reducer";

export const SignUp = () => {

    const dispatch = useDispatch();

    const displayName = useFormInputField("");
    const email = useFormInputField("");
    const password = useFormInputField("");
    const confirmPassword = useFormInputField("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.value !== confirmPassword.value) {
            alert('Password do not match.');
            return;
        }

        dispatch(initSagaSignUp({email: email.value, password: password.value, displayName: displayName.value}));

        displayName.clear();
        email.clear();
        password.clear();
        confirmPassword.clear();
    }

    return (
        <div className={'authForm'}>

            <div className={'authForm__info'}>
                <h2>New user?</h2>
                <p>Sign up with your e-mail and password:</p>
            </div>

            <form onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e)}>

                <FormInput type="text" onChange={(e) => displayName.bind.onChange(e)}
                           value={displayName.bind.value} label={"name"} required={true}/>

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