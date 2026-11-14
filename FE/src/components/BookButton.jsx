import React from 'react';
import Icon from './Icon';
import { BOOKING_URL } from '../lib/site';

/**
 * Every "book" affordance on the site goes through here, so the destination is
 * defined once. Opens the Arogya Rx public booking page in a new tab.
 */
export default function BookButton({
  children,
  className = '',
  variant = 'primary',
  size = '',
  icon = 'calendar_month',
  ...rest
}) {
  const v = variant === 'primary' ? 'btn-primary' : variant === 'good' ? 'btn-good' : '';
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${v} ${size === 'lg' ? 'btn-lg' : ''} ${className}`}
      {...rest}
    >
      {children}
      {icon && <Icon n={icon} size={20} />}
    </a>
  );
}
