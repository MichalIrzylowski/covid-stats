import styled, { css } from "styled-components";

const sharedStyles = css`
  background-color: white;
`;

export const TooltipWrapper = styled.div`
  display: inline-block;
  font-size: 12px;
  padding: 10px;
  border: 1px solid black;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: transform 0.5s ease-in-out, opacity 0.5s 0.5s;
  border-radius: 3px;
  ${sharedStyles}

  &::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -2px) rotate(-45deg);
    ${sharedStyles}
  }
`;
