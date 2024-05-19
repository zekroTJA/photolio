import { useEffect, useState } from 'react';

import { BlurHashWrapper } from 'components/BlurHashWrapper';
import { ImageModel } from 'models/ImageModel';
import ImageService from 'services/ImageService';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const IMAGE_SIZE = 250;
const IMAGE_MARGIN = 5;
const CONTAINER_PADDING = 10;
const MAX_COLUMNS = 5;

const GRID_BREAKPOINTS = (() => {
  const breakpoints: { [key: number | string]: number } = {
    default: MAX_COLUMNS,
  };
  for (let i = 1; i <= MAX_COLUMNS; i++)
    breakpoints[i * (IMAGE_SIZE + 2 * IMAGE_MARGIN) + CONTAINER_PADDING * 2] =
      i - 1;
  return breakpoints;
})();

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: start;
  padding: 0 1em;
`;

const GroupContainer = styled.div`
  width: fit-content;

  > h2 {
    opacity: 0.6;
    font-weight: 300;
    font-size: 1.2rem;
    padding-left: ${IMAGE_MARGIN}px;
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
  const groupList: string[] = [];

  images.forEach((img) => {
    const group = img.group ?? '';

    if (group in map) {
      map[group].push(img);
    } else {
      groupList.push(group);
      map[group] = [img];
    }
  });

  const groups: ImageGroups = groupList.map((key) => [key, map[key]]);

  const i = groups.findIndex(([group, _]) => group === '');
  if (i > -1) {
    groups.push(...groups.splice(i, 1));
  }

  return groups;
};

export const HomeRoute: React.FC = () => {
  const [images, setImages] = useState<ImageGroups>();
  const history = useHistory();

  useEffect(() => {
    ImageService.list().then((images) => setImages(groupImages(images)));
  }, []);

  const imageGroups = images?.map(([heading, images]) => (
    <GroupContainer key={heading}>
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
