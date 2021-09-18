import { ImageModel } from 'models/ImageModel';
import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

interface ImageProps {
  imageURL: string;
}

interface OptDimensions {
  height?: string | number;
  width?: string | number;
}

interface Events {
  onClick?: (id: string) => void;
}

interface Props extends ImageProps, OptDimensions, Events {
  image: ImageModel;
}

const BlurhashContainer = styled(Blurhash)<{
  state: string;
  clickable: boolean;
}>`
  position: absolute !important;
  top: 0;
  left: 0;
  transition: opacity 0.25s ease;
  opacity: ${(p) => (p.state === 'exited' ? 0 : 1)};
  cursor: ${(p) => (p.clickable ? 'pointer' : 'auto')};
`;

const Container = styled.div`
  position: relative;
`;

export const BlurHashWrapper: React.FC<Props> = ({
  image,
  imageURL,
  height,
  width,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);

  const calcHeight =
    !height && typeof width === 'number'
      ? Math.floor(width! * (1 / image.dimensions.ratio))
      : null;
  const calcWidth =
    !width && typeof width === 'number'
      ? Math.floor(width! * image.dimensions.ratio)
      : null;

  return (
    <Container onClick={() => onClick?.call(this, image.id)}>
      <img
        src={imageURL}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
      />
      <Transition in={!loaded} timeout={0}>
        {(state) => (
          <BlurhashContainer
            hash={image.blurhash.hash}
            width={width ?? calcWidth ?? '100%'}
            height={height ?? calcHeight ?? '100%'}
            resolutionX={image.blurhash.components.width}
            resolutionY={image.blurhash.components.height}
            state={state}
            clickable={!!onClick}
          />
        )}
      </Transition>
    </Container>
  );
};
