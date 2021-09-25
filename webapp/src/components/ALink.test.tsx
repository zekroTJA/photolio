import { renderElement } from 'test/helper';
import { ALink } from './ALink';

it('Should rener a _blank link', () => {
  const href = 'https://zekro.de/';
  const alink = renderElement<HTMLLinkElement>(<ALink href={href} />, 'alink');
  expect(alink).not.toBeNull();
  expect(alink.href).toEqual(href);
  expect(alink.target).toEqual('_blank');
});

it('Should rener a _self link', () => {
  const href = 'https://zekro.de/';
  const alink = renderElement<HTMLLinkElement>(
    <ALink href={href} self />,
    'alink'
  );
  expect(alink).not.toBeNull();
  expect(alink.href).toEqual(href);
  expect(alink.target).toEqual('_self');
});

export {};
