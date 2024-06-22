import { Dimensions, ImageModel } from 'models/ImageModel';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { BlurHashWrapper } from 'components/BlurHashWrapper';
import { Details } from './Details';
import ImageService from 'services/ImageService';
import { Overlay } from './Overlay';
import { PaddingContainer } from 'components/PaddingContainer';
import { useParams } from 'react-router';

const Image = styled(BlurHashWrapper)``;

const Container = styled(PaddingContainer)<Horizontal>`
  height: calc(100vh - 10em);
  display: flex;
  gap: 2em;

  ${({ horizontal }) =>
    (horizontal &&
      css`
        flex-direction: row;
        justify-content: center;
      `) ||
    css`
      flex-direction: column;
      align-items: center;
      margin-bottom: 10em;
    `}
`;

export const ImageContext = createContext({} as ImageModel);

type Horizontal = { horizontal: boolean };
type DisplayDimensions = Dimensions & Horizontal;

export const ImageRoute: React.FC = () => {
  const { id } = useParams();
  const [image, setImage] = useState<ImageModel>();
  const [dimensions, setDimensions] = useState<DisplayDimensions | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resizeImage = useCallback(() => {
    if (!containerRef.current || !image) return;
    const { width, height } = containerRef.current?.getBoundingClientRect();
    let displayHeight = height;
    let displayWidth = height * image.ratio;
    if (displayWidth > width) {
      displayWidth = width;
      displayHeight = width / image.ratio;
    }
    setDimensions({
      width: displayWidth,
      height: displayHeight,
      horizontal: width - displayWidth > 300,
    });
  }, [image, containerRef]);

  useEffect(() => {
    if (!id) return;
    ImageService.getMeta(id).then((image) => setImage(image));
  }, [id, setImage]);

  useEffect(() => {
    window.addEventListener('resize', resizeImage);
    return () => window.removeEventListener('resize', resizeImage);
  }, [resizeImage]);

  useEffect(resizeImage, [resizeImage]);

  return (
    <Container ref={containerRef} horizontal={dimensions?.horizontal ?? false}>
      {image && (
        <ImageContext.Provider value={image}>
          <Image
            image={image!}
            imageURL={ImageService.getImageSource(image.id)}
            width={dimensions?.width}
            height={dimensions?.height}
          >
            <Overlay />
          </Image>
          <Details textAlign={dimensions?.horizontal ? 'start' : 'center'} />
        </ImageContext.Provider>
      )}
    </Container>
  );
};
