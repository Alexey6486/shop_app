import React, {ReactChild, ReactChildren} from "react";
import './custom-button.styles.scss';

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
        <button className={`${isGoogle ? 'custom-button googleBtn' : 'custom-button'}`} onClick={onClickHandler}>
            {children}
        </button>
    )
}