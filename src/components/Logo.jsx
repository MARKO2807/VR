import React from 'react';

/** Brand logo – dark-lettered version in light theme, original (white letters) in dark theme. */
export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`.trim()}>
      <img src="/logo-light.png" alt="Horvat Innovative Labs" className="logo__img logo__img--light" width="600" height="157" />
      <img src="/logo-dark.png" alt="" aria-hidden="true" className="logo__img logo__img--dark" width="600" height="157" />
    </span>
  );
}
