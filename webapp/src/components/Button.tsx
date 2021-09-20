import styled from 'styled-components';
import { Theming } from 'util/Theming';

export const Button = styled.button<{ nbg?: boolean }>`
  z-index: 1;
  position: relative;
  padding: 5px 10px;
  border: solid 1px ${(p) => Theming.backgroundColor(!p.theme.dark)};
  font-family: 'Montserrat', sans-serif;
  color: ${(p) => Theming.textColor(p.theme.dark)};
  cursor: pointer;
  background: ${(p) =>
    p.nbg ? 'none' : Theming.backgroundColor(p.theme.dark)};
  transition: all 0.2s ease;

  &:hover {
    color: ${(p) => Theming.textColor(!p.theme.dark)};

    &::after {
      height: 100%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${(p) => Theming.backgroundColor(!p.theme.dark)};
    opacity: 0.75;
    width: 100%;
    height: 0%;
    z-index: -1;
    overflow: hidden;
    transition: all 0.2s ease;
  }
`;
