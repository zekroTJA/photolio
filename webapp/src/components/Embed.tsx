import styled from 'styled-components';

export const Embed = styled.span`
  font-family: 'Source Code Pro', monospace;
  font-weight: 400;
  background-color: rgba(
    ${(p) => (p.theme.dark ? '255, 255, 255, 25%' : '0, 0, 0, 10%')}
  );
  padding: 1px 5px;
`;
