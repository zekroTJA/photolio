import styled from 'styled-components';

export const PaddingContainer = styled.div<{ padding?: string | number }>`
  padding: ${(p) => p.padding ?? '0 5px'};
`;
