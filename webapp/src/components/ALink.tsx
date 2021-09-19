import React from 'react';

interface Props {
  href: string;
  self?: boolean;
}

export const ALink: React.FC<Props> = ({ children, href, self }) => (
  <a
    href={href}
    target={self ? '_self' : '_blank'}
    rel={self ? '' : 'noreferrer'}
  >
    {children}
  </a>
);
