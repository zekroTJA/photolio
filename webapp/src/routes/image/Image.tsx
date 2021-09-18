import { BlurHashWrapper } from 'components/BlurHashWrapper';
import { PaddingContainer } from 'components/PaddingContainer';
import { ImageModel } from 'models/ImageModel';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import ImageService from 'services/ImageService';
import styled from 'styled-components';

interface Match {
  id: string;
}

const Image = styled(BlurHashWrapper)`
  width: 100%;
`;

const Container = styled(PaddingContainer)`
  margin-bottom: 50px;
`;

const Details = styled.div`
  margin-top: 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;

  > p {
    margin: 0 0 10px 0;
  }
`;

const join = (sep: string, ...v: string[]): string =>
  v.filter((e) => !!e).join(sep);

export const ImageRoute: React.FC = () => {
  const match = useRouteMatch<Match>();
  const [image, setImage] = useState<ImageModel>();

  useEffect(() => {
    ImageService.getMeta(match.params.id).then((image) => setImage(image));
  }, [match, setImage]);

  return (
    <Container>
      {image && [
        <Image
          image={image!}
          imageURL={ImageService.getImageSource(image.id)}
          width="100%"
        ></Image>,
        <Details>
          <p>
            {join(' ', image.exif.bodymake, image.exif.bodymodel)}
            &nbsp;with&nbsp;
            {join(' ', image.exif.lensmake, image.exif.lensmodel)}
          </p>
          <p>
            {join(
              ' — ',
              image.exif.iso,
              image.exif.fstop,
              image.exif.exposuretime
            )}
          </p>
        </Details>,
      ]}
    </Container>
  );
};
