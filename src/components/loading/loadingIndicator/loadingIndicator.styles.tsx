import styled from 'styled-components';

export const LoadingWrapComponent = styled.div`
    svg {
        width: 300px;
        height: 250px;
        margin: 0 auto;
        display: block;

        @keyframes dash {
            to {
                stroke-dashoffset: 3000;
            }
        }

        path {
            fill: none;
            stroke: #a06bff;
            stroke-dasharray: 1500;
            animation: dash 2s linear infinite;
            animation-direction: reverse;
            transform: scale(0.4);
        }
    }
`;