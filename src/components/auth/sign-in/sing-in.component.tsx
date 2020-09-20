import React, {FormEvent} from "react";
import {CustomButton} from "../../custom-button/custom-button.component";
import '../authCommonStyles/auth-in-up.styles.scss';
import {useFormInputField} from "../authHooks/useFormInputHook";
import {FormInput} from "../form-input/form-input.component";
import {useDispatch} from "react-redux";
import {initSagaSignInWithEmail, initSagaSignInWithGoogle} from "../../../redux/user/user.reducer";

export const SignIn = () => {

    const dispatch = useDispatch();

    const email = useFormInputField("");
    const password = useFormInputField("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(initSagaSignInWithEmail({email: email.value, password: password.value}));
        email.clear();
        password.clear();
    }

    const onSignInWithGoogle = () => {
        dispatch(initSagaSignInWithGoogle({}));
    };

    return (
        <div className={'authForm'}>

            <div className={'authForm__info'}>
                <h2>Have an account?</h2>
                <p>Sign in with your e-mail and password:</p>
            </div>

            <form onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e)}>

                <FormInput type="email" onChange={(e) => email.bind.onChange(e)}
                           value={email.bind.value} label={"email"} required={true}/>

                <FormInput type="password" onChange={(e) => password.bind.onChange(e)}
                           value={password.bind.value} label={"password"} required={true}/>

                <div className={'authFormGroup'}>
                    <CustomButton>Sign In</CustomButton>
                </div>

            </form>
            <CustomButton onClick={onSignInWithGoogle} isGoogle={true}>Sign In With Google</CustomButton>
        </div>
    )
}