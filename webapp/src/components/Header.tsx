import { Link, useHistory, useLocation } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

const WRAP_DISPLAY_SIZE = '500px';

const Container = styled.div`
  padding: 0 5px 25px 5px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${WRAP_DISPLAY_SIZE}) {
    flex-flow: column;

    > * {
      margin: 0 auto;
    }
  }
`;

const Icon = styled.div`
  cursor: pointer;

  > * {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }

  > h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 52px;
  }

  > h2 {
    font-weight: 300;
    font-size: 14px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;

  @media screen and (max-width: ${WRAP_DISPLAY_SIZE}) {
    margin: 20px auto 10px auto;
  }
`;

const LinkWrapper = styled(Link)<{ state: string }>`
  position: relative;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  text-transform: lowercase;
  text-decoration: none;
  color: black;

  margin-right: 20px;
  &:last-child {
    margin-right: 0px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: ${(p) =>
      p.state === 'entering' || p.state === 'entered' ? 100 : 0}%;
    margin-left: ${(p) => (p.state === 'exiting' ? 100 : 0)}%;
    height: 5px;
    background-color: black;
    transition: all 0.2s ease;
  }
`;

const ControlLink: React.FC<{ to: string; title: string }> = ({
  to,
  title,
}) => {
  const location = useLocation();

  return (
    <Transition in={location.pathname === to} timeout={200}>
      {(state) => (
        <LinkWrapper to={to} state={state}>
          {title}
        </LinkWrapper>
      )}
    </Transition>
  );
};

export const Header: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Icon onClick={() => history.push('/')}>
        <h1>zekro</h1>
        <h2>Photography</h2>
      </Icon>
      <Controls>
        <ControlLink to="/" title="Gallery" />
        <ControlLink to="/about" title="About" />
        <ControlLink to="/contact" title="Contact" />
      </Controls>
    </Container>
  );
};
