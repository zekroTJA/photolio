import { Blurhash } from 'react-blurhash';
import { ImageModel } from 'models/ImageModel';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import { useState } from 'react';

interface ImageProps {
  imageURL: string;
}

interface OptDimensions {
  height?: string | number;
  width?: string | number;
}

interface Events {
  onClick?: (e: React.MouseEvent, id: string) => void;
}

type Props = ImageProps &
  OptDimensions &
  Events &
  React.PropsWithChildren & {
    image: ImageModel;
  };

interface ContainerProps {
  state: string;
}

const BlurhashContainer = styled(Blurhash)<ContainerProps>`
  position: absolute !important;
  top: 0;
  left: 0;
  transition: opacity 0.25s ease;
  opacity: ${(p) => (p.state === 'exited' ? 0 : 1)};
`;

const Container = styled.div`
  position: relative;
  cursor: pointer;

  &:hover #hover-container {
    opacity: 1;
    pointer-events: all;
  }
`;

const HoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
`;

export const BlurHashWrapper: React.FC<Props> = ({
  children,
  image,
  imageURL,
  height,
  width,
}) => {
  const [loaded, setLoaded] = useState(false);

  const calcHeight =
    !height && width && typeof width === 'number'
      ? Math.floor(width * (1 / image.ratio))
      : null;
  const calcWidth =
    !width && height && typeof height === 'number'
      ? Math.floor(height * image.ratio)
      : null;

  return (
    <Container>
      <img
        src={imageURL}
        width={width ?? calcWidth ?? '100%'}
        height={height ?? calcHeight ?? '100%'}
        onLoad={() => setLoaded(true)}
        alt=""
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
          />
        )}
      </Transition>
      {children && (
        <HoverContainer id="hover-container">{children}</HoverContainer>
      )}
    </Container>
  );
};
