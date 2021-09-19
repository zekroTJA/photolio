import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;

  text-align: center;
`;

const Small = styled.p`
  font-size: 12px;
  opacity: 0.6;
`;

const Links = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Separator = styled.div`
  height: 1.2em;
  width: 1px;
  background-color: black;
  margin: 0 10px;
`;

const currentYear = format(new Date(), 'yyyy');

export const Footer: React.FC = () => {
  return (
    <Container>
      <Links>
        <a href="https://www.zekro.de/imprint" target="_blank">
          Imprint
        </a>
        <Separator />
        <a href="https://www.zekro.de" target="_blank">
          Homepage
        </a>
        <Separator />
        <a href="https://github.com/zekrotja/photolio" target="_blank">
          GitHub
        </a>
      </Links>
      <Small>© {currentYear} Ringo Hoffmann</Small>
    </Container>
  );
};
