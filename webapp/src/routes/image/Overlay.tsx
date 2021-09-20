import { Button } from 'components/Button';
import React, { useContext } from 'react';
import ImageService from 'services/ImageService';
import styled from 'styled-components';
import { ImageContext } from './Image';

const Container = styled.div`
  width: 100%;
  padding: 10px;

  > * {
    margin-right: 10px;

    &:last-child {
      margin-right: 0px;
    }
  }
`;

export const Overlay: React.FC = () => {
  const image = useContext(ImageContext);

  const openImage = () => {
    window.open(ImageService.getImageSource(image.id), '_blank');
  };

  return (
    <Container>
      <Button onClick={openImage}>Open original Image</Button>
    </Container>
  );
};
