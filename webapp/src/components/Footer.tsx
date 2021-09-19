import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { ALink } from './ALink';

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
  background-color: currentColor;
  margin: 0 10px;
`;

const currentYear = format(new Date(), 'yyyy');

export const Footer: React.FC = () => {
  return (
    <Container>
      <Links>
        <ALink href="https://www.zekro.de/imprint">Imprint</ALink>
        <Separator />
        <ALink href="https://www.zekro.de">Homepage</ALink>
        <Separator />
        <ALink href="https://github.com/zekrotja/photolio">GitHub</ALink>
      </Links>
      <Small>© {currentYear} Ringo Hoffmann</Small>
    </Container>
  );
};
