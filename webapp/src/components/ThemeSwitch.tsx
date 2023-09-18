import { Transition, TransitionStatus } from 'react-transition-group';
import styled, { ThemeContext } from 'styled-components';

import { ReactComponent as IconDark } from 'assets/dark.svg';
import { ReactComponent as IconLight } from 'assets/light.svg';
import { LocalStorageService } from 'services/LocalStorageService';
import { ThemeUpdateContext } from './ThemeUpdateProvider';
import { useContext } from 'react';

const Container = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10;
  cursor: pointer;
  width: fit-content;
  opacity: 0.25;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.div<{ state: TransitionStatus }>`
  position: absolute;
  top: 0;
  left: -20px;
  opacity: ${(p) => (p.state === 'entering' || p.state === 'entered' ? 1 : 0)};
  transition: all 0.2s ease;

  > svg {
    width: 20px;
  }
`;

export const ThemeSwitch: React.FC = () => {
  const currentTheme = useContext(ThemeContext);
  const updateTheme = useContext(ThemeUpdateContext);

  const setTheme = () => {
    const dark = !currentTheme!.dark;
    updateTheme({ ...currentTheme, dark });
    LocalStorageService.set('themeOverride', dark);
  };

  return (
    <Container onClick={() => setTheme()}>
      <Transition in={currentTheme!.dark} timeout={200}>
        {(state) => (
          <Icon state={state}>
            <IconLight />
          </Icon>
        )}
      </Transition>
      <Transition in={!currentTheme!.dark} timeout={200}>
        {(state) => (
          <Icon state={state}>
            <IconDark />
          </Icon>
        )}
      </Transition>
    </Container>
  );
};
