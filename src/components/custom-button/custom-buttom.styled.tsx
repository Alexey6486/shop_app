import styled, {css} from 'styled-components';

interface isGoogle {
    isGoogle?: boolean
}
const googleBtnStyle = css`
    margin-top: 10px;
    background-color: #b78cff;

    :hover{
        background-color: #C2A3FC
    }
`;
// const getStyles = (props: isGoogle) => {
//     if(props.isGoogle) {
//         return googleBtnStyle;
//     }
// }
export const CustomButtonComponent = styled.button<isGoogle>`
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    background-color: #555555;
    color: #ffffff;
    cursor: pointer;
    transition: background-color linear 150ms;
    outline: none;

    :hover {
        background-color: #777777;
    }
    
    ${props => props.isGoogle ? googleBtnStyle : null}
`;