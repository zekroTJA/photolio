import {
  LinkDiscord,
  LinkInstagram,
  LinkMail,
  LinkTwitter,
} from 'components/ContactLinks';

import { Embed } from 'components/Embed';
import { IconsList } from 'components/IconsList';
import { PaddingContainer } from 'components/PaddingContainer';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 20px;
`;

const ContentContainer = styled.div`
  padding-bottom: 30px;
  &:last-child {
    padding-bottom: 0px;
  }
`;

const ContactMe = () => (
  <ContentContainer>
    <h1>Feel free to contact me 📫</h1>
    <p>
      Just send me a casual DM on instagram or twitter to get in touch with me.
    </p>
    <p>
      Alternatively, you can also join my Discord and DM me there. My Discord
      username is <Embed>zekrotja</Embed>.
    </p>
    <IconsList>
      <LinkTwitter />
      <LinkInstagram />
      <LinkDiscord />
    </IconsList>
    <p>
      If you really want, you can also send me a mail to{' '}
      <Embed>contact@zekro.de</Embed>, but I might be slow to respond. 😅
    </p>
    <IconsList>
      <LinkMail />
    </IconsList>
  </ContentContainer>
);

const ContentUsage = () => (
  <ContentContainer>
    <h1>Content Usage 🖼️</h1>
    <p>
      Generally, you are completely allowed to use all of my content for
      non-public personal use (wallpaper, wallprint, ...).
    </p>
    <p>
      You are also allowed to use my content publicly in your own creations,
      your page, applicatrion or social media{' '}
      <strong>if you give proper credits to me</strong>. This includes my name (
      <Embed>Ringo Hoffmann</Embed>) as well as a link to my web page (
      <Embed>zekro.de</Embed>) either in the <Embed>About</Embed> section of
      your web page / application or adjacent to the content post, for example
      in the instagram image description or tweet content.
    </p>
    <p>
      If you want to use my work for any commercial or advertising application,
      please contact me so we can negotiate a deal together. 😉
    </p>
  </ContentContainer>
);

export const ContactRoute: React.FC = () => {
  return (
    <PaddingContainer>
      <Container>
        <ContactMe />
        <ContentUsage />
      </Container>
    </PaddingContainer>
  );
};
