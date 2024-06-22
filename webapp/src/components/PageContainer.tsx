import { PAGE_CONTAINER_MAX_WIDTH } from 'static/static';
import styled from 'styled-components';

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: ${PAGE_CONTAINER_MAX_WIDTH};
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 100px;
`;
