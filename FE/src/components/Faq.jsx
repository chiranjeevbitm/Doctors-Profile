import React, { useState } from 'react';
import Icon from './Icon';

// Accordion row. The answer is always in the markup (only visually collapsed),
// so crawlers and AI tools that read raw HTML get every answer.
export default function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <h3 className="m-0">
        <button
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="text-[16px] font-bold text-text">{q}</span>
          <Icon n="add" size={22} className={`flex-none text-ink transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
        </button>
      </h3>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[15.5px] leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}
