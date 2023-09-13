import { useEffect, useState } from 'react';

import { BlurHashWrapper } from 'components/BlurHashWrapper';
import { ImageModel } from 'models/ImageModel';
import ImageService from 'services/ImageService';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const IMAGE_SIZE = 250;
const IMAGE_MARGIN = 5;
const MAX_COLUMNS = 5;

const GRID_BREAKPOINTS = (() => {
  const breakpoints: { [key: number | string]: number } = {
    default: MAX_COLUMNS,
  };
  for (let i = 1; i <= MAX_COLUMNS; i++)
    breakpoints[i * (IMAGE_SIZE + 2 * IMAGE_MARGIN)] = i - 1;
  return breakpoints;
})();

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const GroupContainer = styled.div`
  > h2 {
    opacity: 0.6;
    font-weight: 300;
    font-size: 1.2rem;
  }
`;

const Grid = styled(Masonry)`
  display: flex;
  justify-content: start;

  > div {
    width: fit-content !important;

    > * {
      margin: ${IMAGE_MARGIN}px;
    }
  }
`;

type ImageGroups = [string, ImageModel[]][];

const groupImages = (images: ImageModel[]) => {
  const map: { [key: string]: ImageModel[] } = {};

  images.forEach((img) => {
    const group = img.group ?? '';
    if (group in map) {
      map[group].push(img);
    } else {
      map[group] = [img];
    }
  });

  const groups: ImageGroups = Object.keys(map).map((key) => [key, map[key]]);

  const i = groups.findIndex(([group, _]) => group === '');
  groups.push(...groups.splice(i, 1));

  return groups;
};

export const HomeRoute: React.FC = () => {
  const [images, setImages] = useState<ImageGroups>();
  const history = useHistory();

  useEffect(() => {
    ImageService.list().then((images) => setImages(groupImages(images)));
  }, []);

  const imageGroups = images?.map(([heading, images]) => (
    <GroupContainer>
      <h2>{heading || <>&nbsp;</>}</h2>
      <Grid className="" breakpointCols={GRID_BREAKPOINTS}>
        {images.map((img) => (
          <BlurHashWrapper
            key={img.id}
            image={img}
            width={IMAGE_SIZE}
            imageURL={ImageService.getThumbnailSource(img.id, IMAGE_SIZE)}
            onClick={(id) => history.push(`/images/${id}`)}
          />
        ))}
      </Grid>
    </GroupContainer>
  ));

  return <Container>{imageGroups || <></>}</Container>;
};
