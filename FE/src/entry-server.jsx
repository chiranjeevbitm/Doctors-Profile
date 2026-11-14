// Build-time renderer used by scripts/prerender.mjs. Waits for every lazy
// page (prerenderToNodeStream resolves Suspense) and returns plain HTML.
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App.jsx';

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <App Router={StaticRouter} routerProps={{ location: url }} />
    </StrictMode>,
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
