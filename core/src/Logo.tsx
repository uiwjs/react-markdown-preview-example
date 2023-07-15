import { keyframes, styled } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SVG = styled.svg`
  color: var(--rmpe-logo-color, #61dafb);
  height: 8rem;
  margin-bottom: 3rem;
  pointer-events: none;
  animation: ${rotate} infinite 20s linear;
`;

export const Logo = (
  <SVG width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none">
    <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
    </g>
  </SVG>
);
