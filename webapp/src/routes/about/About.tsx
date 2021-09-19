import { PaddingContainer } from 'components/PaddingContainer';
import { formatDistanceToNowStrict } from 'date-fns';
import { WRAP_DISPLAY_BREAKPOINT } from 'static/static';
import styled from 'styled-components';

const Image = styled.div<{ url: string }>`
  background-image: url(${(p) => p.url});
  background-position: center;
  background-size: cover;
  width: 50%;
  aspect-ratio: 500 / 590;
  max-width: 500px;
  float: left;
  margin: 5px 40px 20px 0;

  @media screen and (max-width: ${WRAP_DISPLAY_BREAKPOINT}) {
    float: unset;
    width: 100%;
    aspect-ratio: 500 / 400;
    background-position-y: 25%;
  }
`;

const TextContainer = styled.div`
  text-align: justify;
  padding: 0 50px;

  > img {
    width: 50%;
    max-width: 500px;
    float: left;
    margin: 5px 40px 20px 0;
  }
`;

const AGE = formatDistanceToNowStrict(new Date(1998, 12, 12), {
  roundingMethod: 'floor',
});

export const AboutRoute: React.FC = () => {
  return (
    <PaddingContainer>
      <TextContainer>
        <Image url="assets/avatar.jpg" />
        <h3>Hey 👋</h3>
        <p>
          Thank you for being interested in my work! My name is Ringo (but I'm
          also known as zekro) and I'm {AGE} old. I'm actually working as a
          full-stack developer in germany, but in the middle of 2021, I
          discovered photography as another passion of mine.
        </p>
        <p>
          Years before, I was working a lot on digital design and web video
          production. I created personal web designs for friends of mine (feel
          free to discover some of them on my{' '}
          <a href="https://www.deviantart.com/zekrotja" target="_blank">
            DeviantArt profile
          </a>
          ). Also, all graphical designs for my{' '}
          <a href="https://youtube.com/zekrommaster110">YouTube channel</a> are
          completely self-made.
        </p>
        <p>
          Now, I primarily focus on expressing myself, my feelings and my
          perspectives in photography and photo editing. As you can see in my
          Work, I'm mainly interested in street photography but I am really
          excited to discover and getting into more topics like portrait, car,
          architecture and wildlife photography in the future.
        </p>
      </TextContainer>
    </PaddingContainer>
  );
};
