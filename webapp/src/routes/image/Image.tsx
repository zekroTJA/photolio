import { BlurHashWrapper } from 'components/BlurHashWrapper';
import { PaddingContainer } from 'components/PaddingContainer';
import { format } from 'date-fns';
import { ImageModel } from 'models/ImageModel';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import ImageService from 'services/ImageService';
import styled from 'styled-components';

type Optional<T> = T | undefined;

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

const Small = styled.p<{ italic?: boolean; light?: boolean }>`
  font-size: 14px;
  ${(p) => (p.light ? 'opacity: 0.5;' : '')}
  ${(p) => (p.italic ? 'font-style: italic;' : '')}
`;

const join = (sep: string, ...v: Optional<string>[]): string =>
  v.filter((e) => !!e).join(sep);

const prefix = (prefix: string, v: Optional<string>): Optional<string> =>
  !!v ? `${prefix}${v}` : undefined;

export const ImageRoute: React.FC = () => {
  const match = useRouteMatch<Match>();
  const [image, setImage] = useState<ImageModel>();

  useEffect(() => {
    ImageService.getMeta(match.params.id).then((image) => setImage(image));
  }, [match, setImage]);

  return (
    <Container>
      {image && (
        <div>
          <Image
            image={image!}
            imageURL={ImageService.getImageSource(image.id)}
            width="100%"
          ></Image>
          <Details>
            {(image.exif && (
              <div>
                <p>
                  {join(' ', image.exif.bodymake, image.exif.bodymodel)}
                  &nbsp;with&nbsp;
                  {join(' ', image.exif.lensmake, image.exif.lensmodel)}
                </p>
                <p>
                  {join(
                    ' — ',
                    prefix('ISO ', image.exif.iso),
                    image.exif.fstop,
                    image.exif.exposuretime
                  )}
                </p>
              </div>
            )) || (
              <Small italic light>
                No exif data existent.
              </Small>
            )}
            <Small>
              {format(
                new Date(image.exif?.taken ?? image.timestamp),
                'eeee, do LLLL yyyy — HH:MM:SS O'
              )}
            </Small>
          </Details>
        </div>
      )}
    </Container>
  );
};
