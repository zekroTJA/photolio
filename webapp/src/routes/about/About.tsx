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

import { ALink } from 'components/ALink';
import { IconsList } from 'components/IconsList';
import { PaddingContainer } from 'components/PaddingContainer';
import { WRAP_DISPLAY_BREAKPOINT } from 'static/static';
import { formatDistanceToNowStrict } from 'date-fns';
import styled from 'styled-components';

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
          My name is Ringo (but I'm also known as zekro) and I'm {AGE} old.
          Thank you for being interested in my work! I'm actually working as a{' '}
          <ALink href="https://github.com/zekrotja">backend developer</ALink> in
          germany, but in the middle of 2021, I discovered photography as
          another passion of mine.
        </p>
        <p>
          Now, I primarily focus on expressing myself, my feelings and my
          perspectives in photography and photo editing. As you can see in my
          Work, I'm mainly interested in street photography but I am really
          excited to discover and getting into more topics like portrait, car,
          architecture and wildlife photography in the future Now, I am
          primarily focussed on capturing great moments around the world,
          expressing my point of view and generally learning new stuff in the
          world of photography. As you can see, I am currently mostly interested
          in wildlife, nature, architectural and street photography, but I also
          want to discover many more topics like portrait, car, event or astro
          photography.
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
