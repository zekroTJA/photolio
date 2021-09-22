import { ALink } from 'components/ALink';
import { PaddingContainer } from 'components/PaddingContainer';
import { formatDistanceToNowStrict } from 'date-fns';
import { WRAP_DISPLAY_BREAKPOINT } from 'static/static';
import styled from 'styled-components';

import { IconsList } from 'components/IconsList';
import {
  LinkDeviantart,
  LinkGithub,
  LinkInstagram,
  LinkMail,
  LinkSpotify,
  LinkTiktok,
  LinkTwitter,
  LinkUnsplash,
  LinkYoutube,
} from 'components/ContactLinks';

const Image = styled.div<{ url: string }>`
  background-image: url(${(p) => p.url});
  background-position: center;
  background-size: cover;
  width: 50%;
  max-height: 60vh;
  aspect-ratio: 500 / 590;
  max-width: 500px;
  float: left;
  margin: 5px 40px 20px 0;

  @media screen and (max-width: ${WRAP_DISPLAY_BREAKPOINT}) {
    float: unset;
    width: 100%;
    aspect-ratio: 500 / 400;
    background-position-y: 25%;
    max-height: unset;
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
        <h2>Hey 👋</h2>
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
          <ALink href="https://www.deviantart.com/zekrotja">
            DeviantArt profile
          </ALink>
          ). Also, all graphical designs for my{' '}
          <ALink href="https://youtube.com/zekrommaster110">
            YouTube channel
          </ALink>{' '}
          are completely self-made.
        </p>
        <p>
          Now, I primarily focus on expressing myself, my feelings and my
          perspectives in photography and photo editing. As you can see in my
          Work, I'm mainly interested in street photography but I am really
          excited to discover and getting into more topics like portrait, car,
          architecture and wildlife photography in the future.
        </p>
        <h2>Get to know me ✉️</h2>
        <IconsList>
          <LinkMail />
          <LinkInstagram />
          <LinkUnsplash />
          <LinkDeviantart />
          <LinkTwitter />
          <LinkYoutube />
          <LinkGithub />
          <LinkSpotify />
          <LinkTiktok />
        </IconsList>
      </TextContainer>
    </PaddingContainer>
  );
};
