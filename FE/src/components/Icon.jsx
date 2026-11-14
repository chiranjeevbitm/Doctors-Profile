import React from 'react';

/**
 * Inline SVG icons, drawn on a 24px grid in a single outline style.
 *
 * This replaces the Material Symbols web font. An icon font meant two extra
 * round trips to a third-party host, and until it arrived the browser painted
 * the ligature name — so a patient on a slow Muzaffarpur connection saw the
 * word "calendar_month" where the button should be. Inline paths cannot fail
 * that way, and ~40 glyphs cost less than the font did.
 */

const S = {
  // ── general ────────────────────────────────────────────────────────────
  call: 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1Z',
  calendar_month: 'M7 3v3M17 3v3M3.5 9.5h17M5 6h14a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 19 21H5a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 5 6ZM8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01',
  location_on: 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  pin_drop: 'M12 21h8M12 17s6-4.9 6-9.5a6 6 0 0 0-12 0C6 12.1 12 17 12 17Z M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  schedule: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 2',
  mail: 'M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1ZM3.4 6.8 12 13l8.6-6.2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  add: 'M12 5v14M5 12h14',
  check: 'M4.5 12.8 9.5 18 19.5 6.5',
  check_circle: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8 12.3l2.7 2.8L16 9.5',
  arrow_forward: 'M4 12h15M13 6l6 6-6 6',
  open_in_new: 'M14 4h6v6M20 4l-8.5 8.5M18 14.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4.5',
  send: 'M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z',
  translate: 'M3 5.5h9M7.2 5.5V3.5M9.6 5.5a9.6 9.6 0 0 1-6.1 8.6M5 9.5a8.6 8.6 0 0 0 5.8 4.6M12.5 20.5l4-10 4 10M14 17.8h5',
  bolt: 'M13.2 2.5 5 13.5h5.6L10 21.5l8.2-11h-5.6l.6-8Z',
  translate_off: 'M3 5.5h9',

  // ── trust / credentials ───────────────────────────────────────────────
  verified: 'M12 2.8 14.3 5l3.1-.2.3 3.1 2.3 2.1-2.3 2.1-.3 3.1-3.1-.2L12 17.2 9.7 15l-3.1.2-.3-3.1L4 10l2.3-2.1.3-3.1L9.7 5 12 2.8ZM9.3 10.2l2 2 3.5-3.6M7 17l-1.8 4.3 3.1-.9 2 2.1M17 17l1.8 4.3-3.1-.9-2 2.1',
  verified_user: 'M12 3 5 5.8v5.4c0 4.2 2.9 8.2 7 9.3 4.1-1.1 7-5.1 7-9.3V5.8L12 3ZM9 12.2l2.1 2.1 4.2-4.3',
  shield_person: 'M12 3 5 5.8v5.4c0 4.2 2.9 8.2 7 9.3 4.1-1.1 7-5.1 7-9.3V5.8L12 3ZM12 11.3a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM8.6 16.4a3.6 3.6 0 0 1 6.8 0',
  trophy: 'M7 4h10v5a5 5 0 0 1-10 0V4ZM7 5.5H4.5V7a3 3 0 0 0 3 3M17 5.5h2.5V7a3 3 0 0 1-3 3M12 14v3.5M8.5 20.5h7M9.5 17.5h5l.8 3h-6.6l.8-3Z',
  workspace_premium: 'M12 3.2 14 7l4.2.6-3 3 .7 4.2-3.9-2-3.9 2 .7-4.2-3-3L9.9 7l2.1-3.8ZM9 15.5 7.5 21l4.5-2.2L16.5 21 15 15.5',
  school: 'M12 4 2.5 8.6 12 13.2l9.5-4.6L12 4ZM6.5 11v5c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-5M21.5 8.6v5.2',
  menu_book: 'M12 6.5C10.5 5 8.3 4.3 5 4.5v12c3.3-.2 5.5.5 7 2 1.5-1.5 3.7-2.2 7-2v-12c-3.3-.2-5.5.5-7 2ZM12 6.5v12',

  // ── clinical ───────────────────────────────────────────────────────────
  stethoscope: 'M6 3v5.5a4 4 0 0 0 8 0V3M6 3H4.3M6 3h1.7M14 3h-1.7M14 3h1.7M10 16.5v1a4 4 0 0 0 8 0v-1.6M18 11.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
  monitor_heart: 'M3.5 6h17a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM5.5 12h3l1.5-3.2 2.4 6.4L15 12h3.5',
  vital_signs: 'M3 12h4l2-5 3 10 2.5-7 1.7 4h4.8',
  pill: 'M9.4 14.6 14.6 9.4M7.3 16.7a4.7 4.7 0 0 1 0-6.6l2.8-2.8a4.7 4.7 0 0 1 6.6 6.6l-2.8 2.8a4.7 4.7 0 0 1-6.6 0Z',
  medical_services: 'M3.5 7.5h17a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM9 7.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5M12 10.5v5M9.5 13h5',
  emergency: 'M12 2.8 13.9 9l6.3.3-5 3.9 1.8 6.1L12 15.8 7 19.3l1.8-6.1-5-3.9L10.1 9 12 2.8Z',
  local_hospital: 'M5 9.5 12 4l7 5.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9.5ZM12 10v5M9.5 12.5h5',
  biotech: 'M8 3v5.5l4 2.5 4-2.5V3M8 5.6h8M6.5 21h11M9 21a3 3 0 0 1 6 0M12 11v10',
  science: 'M10 3v6.2L4.8 18A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3L14 9.2V3M8.5 3h7M7.4 14.5h9.2',
  endocrinology: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8.2 10.4c1.6-1.7 2.3 1.9 3.8.3s2.2 2 3.8.3',
  pulmonology: 'M12 4v7M9 11c0-2.5-1.3-4-2.8-4C4.8 7 4 8.3 4 10.2c0 3.4 1 6.4 2.4 8.3.7.9 2.6.6 2.6-.7V11ZM15 11c0-2.5 1.3-4 2.8-4C19.2 7 20 8.3 20 10.2c0 3.4-1 6.4-2.4 8.3-.7.9-2.6.6-2.6-.7V11Z',
  gastroenterology: 'M7 4v4.5a4 4 0 0 0 8 0V7a2.5 2.5 0 0 1 5 0v6.5a6 6 0 0 1-6 6H9a4 4 0 0 1-4-4',
  videocam: 'M4 6.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM14 11l6-3.2v8.4L14 13',
  lab_panel: 'M5 4h14a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM8 8.5h8M8 12h8M8 15.5h4',
  receipt_long: 'M6 3h12v16l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3L6 19V3ZM9 7.5h6M9 11h6M9 14.5h3',
  notifications_active: 'M18 9a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16S18 14 18 9ZM10.3 19a2 2 0 0 0 3.4 0',
  favorite: 'M12 20.3s-7.6-4.6-7.6-10A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.6 2.9c0 5.4-7.6 10-7.6 10Z',
  diversity_1: 'M12 7.8a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM5.4 17.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM18.6 17.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM8.6 20.8a3.8 3.8 0 0 1 6.8 0M7.4 9.6a6.6 6.6 0 0 0-2.3 3M16.6 9.6a6.6 6.6 0 0 1 2.3 3',
};

export default function Icon({ n, size = 20, className = '', stroke = 1.75, ...rest }) {
  const d = S[n];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`inline-block flex-none align-middle ${className}`}
      {...rest}
    >
      {d.split('M').filter(Boolean).map((seg, i) => (
        <path key={i} d={'M' + seg} />
      ))}
    </svg>
  );
}

export const hasIcon = (n) => Boolean(S[n]);
