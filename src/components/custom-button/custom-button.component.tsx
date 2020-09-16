import React, {ReactChild, ReactChildren} from "react";
import './custom-button.styles.scss';
import {CustomButtonComponent} from "./custom-buttom.styles";

interface ChildrenType {
    children: ReactChild | ReactChildren;
}
type PropsType = ChildrenType & {
    type?: string
    onClick?: () => void
    isGoogle?: boolean
}


export const CustomButton = (props: PropsType) => {

    const {children, onClick, type, isGoogle} = props;

    const onClickHandler = () => {
        if (onClick) {
            onClick();
        }
    }

    return (
        <CustomButtonComponent isGoogle={isGoogle} onClick={onClickHandler}>
            {children}
        </CustomButtonComponent>
    )
}