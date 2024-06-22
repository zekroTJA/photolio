import React, { useContext } from 'react';

import { ImageContext } from './Image';
import { format } from 'date-fns';
import styled from 'styled-components';

type Props = { textAlign: string };

type Optional<T> = T | undefined;

const Container = styled.div<{ textAlign: string }>`
  text-align: ${({ textAlign }) => textAlign};
  font-family: 'Montserrat', sans-serif;
  line-height: 1em;
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

export const Details: React.FC<Props> = ({ textAlign }) => {
  const image = useContext(ImageContext);

  return (
    <Container textAlign={textAlign}>
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
    </Container>
  );
};
