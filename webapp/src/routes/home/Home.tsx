import { useEffect, useState } from 'react';

import { BlurHashWrapper } from 'components/BlurHashWrapper';
import { ImageModel } from 'models/ImageModel';
import ImageService from 'services/ImageService';
import Masonry from 'react-masonry-css';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const IMAGE_WIDTH = 250;
const IMAGE_MARGIN = 20;
const MAX_COLUMNS = 5;

const GRID_BREAKPOINTS = (() => {
  const breakpoints: { [key: number | string]: number } = {
    default: MAX_COLUMNS,
  };
  for (let i = 1; i <= MAX_COLUMNS; i++)
    breakpoints[i * (IMAGE_WIDTH + 2 * IMAGE_MARGIN)] = i - 1;
  return breakpoints;
})();

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: start;
  padding: 0 1em;
  width: fit-content;
  margin: 0 auto;

  @media screen and (max-width: ${IMAGE_WIDTH * 2 + IMAGE_MARGIN}px) {
    align-items: center;

    img,
    canvas {
      width: calc(100vw - 3em) !important;
      height: 100%;
    }
  }
`;

const GroupContainer = styled.div`
  width: fit-content;

  > h2 {
    opacity: 0.6;
    font-weight: 300;
    font-size: 1.2rem;
  }
`;

const Grid = styled(Masonry)`
  display: flex;
  justify-content: start;
  gap: ${IMAGE_MARGIN}px;

  > div {
    width: fit-content !important;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: ${IMAGE_MARGIN}px;
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

  useEffect(() => {
    ImageService.list().then((images) => setImages(groupImages(images)));
  }, []);

  const imageGroups = images?.map(([heading, images]) => (
    <GroupContainer key={heading}>
      <h2>{heading || <>&nbsp;</>}</h2>
      <Grid className="" breakpointCols={GRID_BREAKPOINTS}>
        {images.map((img) => (
          <ImageContainer>
            <NavLink to={`/images/${img.id}`}>
              <BlurHashWrapper
                key={img.id}
                image={img}
                width={IMAGE_WIDTH}
                imageURL={ImageService.getThumbnailSource(img.id, IMAGE_WIDTH)}
              />
            </NavLink>
          </ImageContainer>
        ))}
      </Grid>
    </GroupContainer>
  ));

  return <Container>{imageGroups || <></>}</Container>;
};
