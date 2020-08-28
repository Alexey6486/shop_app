import React, {FormEvent} from "react";
import { CustomButton } from "../../custom-button/custom-button.component";
import '../authCommonStyles/auth-in-up.styles.scss';
import {useFormInputField} from "../authHooks/useFormInputHook";
import {FormInput} from "../form-input/form-input.component";
import {signInWithGoogle, auth} from "../../../firebase/firebase.utils";

export const SignIn = () => {

    const email = useFormInputField("");
    const password = useFormInputField("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email.value, password.value);
            email.clear();
            password.clear();
        } catch(error) {
            console.log(error);
        }
    }

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
            <CustomButton onClick={signInWithGoogle} isGoogle={true}>Sign In With Google</CustomButton>
        </div>
    )
}