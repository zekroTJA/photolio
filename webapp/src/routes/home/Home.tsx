import { useEffect, useState } from 'react';
import { ImageModel } from 'models/ImageModel';
import ImageService from 'services/ImageService';
import { BlurHashWrapper } from 'components/BlurHashWrapper';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';

const IMAGE_SIZE = 250;
const IMAGE_MARGIN = 5;

// cols = w / (IMAGE_SIZE + 2 * IMAGE_MARGIN)
// w = cols * (IMAGE_SIZE + 2 * IMAGE_MARGIN)

const GRID_BREAKPOINTS = (() => {
  const max = 5;
  const breakpoints: { [key: number | string]: number } = {
    default: max,
  };
  for (let i = 1; i <= max; i++)
    breakpoints[i * (IMAGE_SIZE + 2 * IMAGE_MARGIN)] = i - 1;
  return breakpoints;
})();

const Grid = styled(Masonry)`
  display: flex;
  justify-content: center;

  > div {
    width: fit-content !important;

    > * {
      margin: ${IMAGE_MARGIN}px;
    }
  }
`;

export const HomeRoute: React.FC = () => {
  const [images, setImages] = useState<ImageModel[]>();

  useEffect(() => {
    ImageService.list().then(setImages);
  }, [setImages]);

  const imageTiles = images?.map((img) => (
    <BlurHashWrapper
      key={img.id}
      image={img}
      width={IMAGE_SIZE}
      imageURL={ImageService.getThumbnailSource(img.id, IMAGE_SIZE)}
    />
  ));

  return (
    <Grid className="" breakpointCols={GRID_BREAKPOINTS}>
      {imageTiles}
    </Grid>
  );
};
