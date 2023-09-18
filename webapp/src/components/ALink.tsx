import React from 'react';

type Props = React.PropsWithChildren & {
  href: string;
  self?: boolean;
};

export const ALink: React.FC<Props> = ({ children, href, self }) => (
  <a
    href={href}
    target={self ? '_self' : '_blank'}
    rel="noreferrer"
    data-testid="alink"
  >
    {children}
  </a>
);

