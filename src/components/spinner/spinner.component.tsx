import React from "react";
import './spinner.styles';
import { SpinnerWrapComponent } from "./spinner.styles";

export const WithSpinner = (WrappedComponent: any) => ({isLoading, ...otherProps}: any) => {
    return isLoading ? (
        <SpinnerWrapComponent>Spinner</SpinnerWrapComponent>
    ) : <WrappedComponent {...otherProps}/>;
};
