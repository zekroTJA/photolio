import { render } from '@testing-library/react';

export function renderElement<T extends HTMLElement>(
  el: JSX.Element,
  testId: string
): T {
  const { queryByTestId } = render(el);
  return queryByTestId(testId) as T;
}
