import { ImageModel } from 'models/ImageModel';
import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

interface ImageProps {
  imageURL: string;
}

interface OptDimensions {
  height?: number;
  width?: number;
}

interface Props extends ImageProps, OptDimensions {
  image: ImageModel;
}

const BlurhashContainer = styled(Blurhash)<{ state: string }>`
  position: absolute !important;
  top: 0;
  left: 0;
  transition: opacity 0.25s ease;
  opacity: ${(p) => (p.state === 'exited' ? 0 : 1)};
`;

const Container = styled.div`
  position: relative;
`;

export const BlurHashWrapper: React.FC<Props> = ({
  image,
  imageURL,
  height,
  width,
}) => {
  const [loaded, setLoaded] = useState(false);

  if (!height) height = Math.floor(width! * (1 / image.dimensions.ratio));
  else width = Math.floor(height! * image.dimensions.ratio);

  return (
    <Container>
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
            width={width}
            height={height}
            resolutionX={image.blurhash.components.width}
            resolutionY={image.blurhash.components.height}
            state={state}
          />
        )}
      </Transition>
    </Container>
  );
};
