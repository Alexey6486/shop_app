import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Container} from "../../styles/global.styled.components";

interface Active {
    active?: boolean
}

export const HeaderContainer = styled.div`
    height: 50px;
    border-bottom: 1px solid #d2cece;
    display: flex;
    align-items: center;
    background-color: #ffffff;
`;
export const HeaderFrame = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    position: relative;
`;
export const NavContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;
export const LinkContainer = styled(Link)<Active>`
    text-transform: uppercase;
    font-weight: 300;
    color: #333333;
    font-size: 20px;
    text-decoration: none;
    margin-right: 10px;
    transition: all linear 200ms;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
  
    border-bottom: ${(props) => props.active ? '2px solid #d2cece' : '2px solid transparent'};
    
    :hover{
        color: #b78cff;
        border-bottom: 2px solid #d2cece;
    }
`;

