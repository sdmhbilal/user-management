import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ebebeb91;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side, #5762c7 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #5762c7);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: ${rotate} 1s infinite linear;
`;

const Loader = () => (
  <Wrapper>
    <LoaderContainer />
  </Wrapper>
);

export default Loader;
