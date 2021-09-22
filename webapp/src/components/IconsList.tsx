import styled from 'styled-components';

export const IconsList = styled.div`
  > * {
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }

    transition: all 0.2s ease;

    margin-right: 10px;
    &::last-child {
      margin-right: 0;
    }

    > svg {
      width: 30px;
    }
  }
`;
