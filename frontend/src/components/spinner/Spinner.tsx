import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <LoadingCircle />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingCircle = styled.div`
  width: 5%;
  aspect-ratio: 1 / 1;
  border: 0.5rem dotted #bbb;
  border-top: 0.5rem dotted #fff;
  border-radius: 50px;
  animation: ${rotate} 1.2s cubic-bezier(0.01, 1.05, 1,-0.05) infinite;
`;

export { Spinner };
