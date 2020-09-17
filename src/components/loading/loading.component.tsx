import React from "react";
import {LoadingIndicator} from "./loadingIndicator/loadingIndicator.component";

export const WithSpinner = (WrappedComponent: any) => ({isLoading, ...otherProps}: any) => {
    return isLoading ? (
        <LoadingIndicator/>
    ) : <WrappedComponent {...otherProps}/>;
};
