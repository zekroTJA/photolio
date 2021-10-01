import { renderElement } from 'test/helper';
import { ALink } from './ALink';

it('Should rener a _blank link', () => {
  const href = 'https://zekro.de/';
  const alink = renderElement<HTMLLinkElement>(<ALink href={href} />, 'alink');
  expect(alink).not.toBeNull();
  expect(alink).toHaveProperty('href', href);
  expect(alink).toHaveProperty('target', '_blank');
});

it('Should rener a _self link', () => {
  const href = 'https://zekro.de/';
  const alink = renderElement<HTMLLinkElement>(
    <ALink href={href} self />,
    'alink'
  );
  expect(alink).not.toBeNull();
  expect(alink).toHaveProperty('href', href);
  expect(alink).toHaveProperty('target', '_self');
});

it('Should rener a link with content', () => {
  const href = 'https://zekro.de/';
  const content = 'Some content';
  const alink = renderElement<HTMLLinkElement>(
    <ALink href={href} self>
      {content}
    </ALink>,
    'alink'
  );
  expect(alink).not.toBeNull();
  expect(alink).toHaveTextContent(content);
});

it('Should rener a link with children', () => {
  const href = 'https://zekro.de/';
  const content = 'Some content';
  const alink = renderElement<HTMLLinkElement>(
    <ALink href={href} self>
      <i>{content}</i>
    </ALink>,
    'alink'
  );
  expect(alink).not.toBeNull();
  expect(alink.querySelector('i')?.innerHTML).toBe(content);
});

export {};
