import { BlurHashWrapper } from 'components/BlurHashWrapper';
import { PaddingContainer } from 'components/PaddingContainer';
import { ImageModel } from 'models/ImageModel';
import { createContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import ImageService from 'services/ImageService';
import styled from 'styled-components';
import { Details } from './Details';
import { Overlay } from './Overlay';

interface Match {
  id: string;
}

const Image = styled(BlurHashWrapper)`
  width: 100%;
`;

const Container = styled(PaddingContainer)`
  margin-bottom: 50px;
`;

export const ImageContext = createContext({} as ImageModel);

export const ImageRoute: React.FC = () => {
  const match = useRouteMatch<Match>();
  const [image, setImage] = useState<ImageModel>();

  useEffect(() => {
    ImageService.getMeta(match.params.id).then((image) => setImage(image));
  }, [match, setImage]);

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
