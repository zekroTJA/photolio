import { ALink } from './ALink';
import { renderElement } from 'test/helper';

it('Should rener a _blank link', () => {
  const href = 'https://zekro.de/';
  const view = renderElement<HTMLLinkElement>(<ALink href={href} />, 'alink');
  expect(view).not.toBeNull();
  expect(view).toHaveProperty('href', href);
  expect(view).toHaveProperty('target', '_blank');
});

it('Should rener a _self link', () => {
  const href = 'https://zekro.de/';
  const view = renderElement<HTMLLinkElement>(
    <ALink href={href} self />,
    'alink'
  );
  expect(view).not.toBeNull();
  expect(view).toHaveProperty('href', href);
  expect(view).toHaveProperty('target', '_self');
});

it('Should rener a link with content', () => {
  const href = 'https://zekro.de/';
  const content = 'Some content';
  const view = renderElement<HTMLLinkElement>(
    <ALink href={href} self>
      {content}
    </ALink>,
    'alink'
  );
  expect(view).not.toBeNull();
  expect(view).toHaveTextContent(content);
});

it('Should rener a link with children', () => {
  const href = 'https://zekro.de/';
  const content = 'Some content';
  const view = renderElement<HTMLLinkElement>(
    <ALink href={href} self>
      <i>{content}</i>
    </ALink>,
    'alink'
  );
  expect(view).not.toBeNull();
  expect(view.querySelector('i')?.innerHTML).toBe(content);
});

export {};
