import { createContext, useEffect, useState } from 'react';

import { BlurHashWrapper } from 'components/BlurHashWrapper';
import { Details } from './Details';
import { ImageModel } from 'models/ImageModel';
import ImageService from 'services/ImageService';
import { Overlay } from './Overlay';
import { PaddingContainer } from 'components/PaddingContainer';
import styled from 'styled-components';
import { useParams } from 'react-router';

const Image = styled(BlurHashWrapper)`
  width: 100%;
`;

const Container = styled(PaddingContainer)`
  margin-bottom: 50px;
`;

export const ImageContext = createContext({} as ImageModel);

export const ImageRoute: React.FC = () => {
  const { id } = useParams();
  const [image, setImage] = useState<ImageModel>();

  useEffect(() => {
    if (!id) return;
    ImageService.getMeta(id).then((image) => setImage(image));
  }, [id, setImage]);

  return (
    <Container>
      {image && (
        <ImageContext.Provider value={image}>
          <div>
            <Image
              image={image!}
              imageURL={ImageService.getImageSource(image.id)}
              width="100%"
            >
              <Overlay />
            </Image>
            <Details />
          </div>
        </ImageContext.Provider>
      )}
    </Container>
  );
};
