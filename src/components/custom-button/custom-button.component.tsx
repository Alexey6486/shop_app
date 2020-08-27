import React, {ReactChild, ReactChildren} from "react";
import './custom-button.styles.scss';

interface ChildrenType {
    children: ReactChild | ReactChildren;
}
type PropsType = ChildrenType & {
    type?: string
}


export const CustomButton = (props: PropsType) => {

    const {children} = props;

    return (
        <button className={'custom-button'}>
            {children}
        </button>
    )
}