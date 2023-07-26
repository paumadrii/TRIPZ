import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = ({ width = 24, height = 24, color = 'orange', className }) => (
  <svg className={className} width={width} height={height} viewBox={`0 0 52 52`} fill="none" xmlns="http://www.w3.org/2000/svg">
    ;
    <path d="M50 26C50 39.2548 39.2548 50 26 50C12.7452 50 2 39.2548 2 26C2 12.7452 12.7452 2 26 2C39.2548 2 50 12.7452 50 26Z" stroke="#202020" strokeOpacity="0.18" strokeWidth="4" />
    <RotatePath d="M49.9999 26C49.9999 12.9812 39.6342 2.38355 26.7058 2.01013" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export default Loading;

const rotate = keyframes`
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
`;
const RotatePath = styled.path`
  transform-origin: 50% 50%;
  animation: ${rotate} 1s linear infinite;
`;
