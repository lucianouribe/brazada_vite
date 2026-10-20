# Brazada

A frontend-only React recreation of the Brazada website, built with Vite
and JavaScript. No WordPress, backend, database, or WordPress CSS is required.

## Getting started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `src/App.jsx` selects the page and composes
the shared layout. Separate page components live in `src/pages/`,
with `Placeholder.jsx` for pages still to be built.
Shared header, footer, contact form, and UI components live in `src/components/`.
The carousel hook lives in `src/hooks/useCarousel.js`.
Spanish page copy and interface labels are in `public/data/es.json`.
Menu destinations and shared URLs remain in `src/content.js`, which connects
the components to that JSON.
Landing-page and shared navigation/footer styles are in `src/App.css`;
`src/index.css` contains the reset and the three locally hosted Avenir font weights.
The hero's two Roboto weights are also hosted locally; their license is included
in `public/licenses/Roboto-LICENSE.txt` and is copied into production builds.
Images are imported individually from `src/assets/imgs`, so unrelated assets are not
included in the production build.

The header, service menu, and footer link to local routes. These routes retain the
shared header and footer. Implemented routes are `/`, `/normatividad/`,
`/porque-brazada/`, `/contactenos/`, `/natacion/`, `/fitness/`,
`/hidrogimnasia/`, `/masajes/`, `/protocolos/`, `/tarifas/`, and `/horarios/`.
Mente & cuerpo has been removed from this recreation, including its footer link,
translations, metadata, schema and sitemap entry. Its old URL is noindexed and
uses the not-found page rather than advertising a blank service page.
The unused `/tratamiento-de-datos/` placeholder remains unfinished; the footer
links directly to the local policy PDF instead.
Unknown routes display a not-found message.

Normatividad has its own scoped stylesheet in `src/pages/Normatividad.css`.
Its original policy PDF is hosted locally in `public/documents/` and copied to
the production build.

Porqué Brazada has its own scoped stylesheet in `src/pages/PorqueBrazada.css`.
It reproduces the visible safety/accessibility features, institutional story,
and gym image. The pool-lift video opens in an accessible dialog using YouTube's
privacy-enhanced embed and is unloaded when the dialog closes. A direct YouTube
link is also available. The original site's hidden Plan Integral text remains
omitted from the visible page.

The four service pages reuse `ServiceLayout` and `ServiceRow` for their banners,
alternating image/text sections, and information actions. Their content remains
in separate page components. Protocolos reuses the same row layout for the
original rules and lists. New page layouts use scoped styles rather than
WordPress stylesheets. `PageBanner` is shared by these six new pages.

Contáctenos includes the original Google Maps embed, address, phone, email,
social links, and a light contact form. The service pages' lower “Contáctenos”
buttons open a shared, keyboard-accessible contact dialog. Their inline WhatsApp
links retain the original direct-contact behavior. “Ver tarifas” links to the
local pricing page.

Tarifas reads all eight pricing groups and their 15 entries from
`public/data/tarifas.json`. Update that file to change prices without editing JSX.
The top-level `year` is shown behind each group heading. `groups` is an object
keyed by the displayed group names, in display order. Each group has
`backgroundColor`, `textColor`, and an `items` object with numbered string keys
(`"1"`, `"2"`, etc.), rendered in numeric order:

```json
{
  "backgroundColor": "#9dcde1",
  "textColor": "#232232",
  "items": {
    "1": {
      "description": "Natación bebés y niños",
      "price": "$ 305.000",
      "quantity": "1 vez / semana"
    }
  }
}
```

An optional group `title` overrides the heading; `\n` preserves the original
desktop line break for personalized swimming classes.
Prices are display strings, preserving Colombian formatting and suffixes such as
`C/U`. An empty `description` leaves that line blank, as on the original
Matrícula and Gimnasio cards. Add groups or numbered items in the JSON and the
page renders them automatically. Pricing uses `PricingCard` and its own scoped
stylesheet, `src/pages/Tarifas.css`.

Horarios reads its five schedule groups from `public/data/horarios.json`.
`groups` is keyed by the visible heading (for example, `"Jornada"` or
`"Clases en tierra"`). Each group has a `backdrop` for the pale heading and an
`items` object with numbered string keys. Each item has a `description` containing
one displayed schedule line:

```json
{
  "backdrop": "Brazada",
  "items": {
    "1": { "description": "Lunes a viernes desde las 6:00 a.m hasta las 7:30 p.m" },
    "2": { "description": "Sábados desde las 7:00 a.m hasta las 1:00 p.m" }
  }
}
```

Edit, add, or remove groups and entries in the JSON; `Horarios` and
`ScheduleGroup` loop over them automatically, with items in numeric order.
Reservation instructions and the instructor line are data entries too.
The page preserves the current site's text, including the original
`"Nataclión"` backdrop, which can be corrected directly in the JSON if desired.
Its banner and swimming image are local assets, and its scoped styles live in
`src/pages/Horarios.css`. The current original page has no timetable filters,
so no legacy WordPress timetable plugin or unused filter UI is included.

Contact forms use native browser validation and open WhatsApp with the
entered name, email, and message (plus phone in page/dialog forms). Each form
has unique label/input IDs, including when a page form and footer coexist.
The visitor must confirm sending in WhatsApp;
nothing is stored or sent to a backend by this app. YouTube uses its
privacy-enhanced embed. Instagram links open the original profile; the broken
WordPress feed shortcode is not carried over.

Both carousels include previous/next and pause controls. Automatic rotation is
disabled when the visitor prefers reduced motion.

## Page text and languages

Edit `public/data/es.json` for Spanish and `public/data/en.json` for English without
editing components. Brazada remains the company name in both languages:

- `metadata`: document language and legacy title/description defaults. Audited
  Spanish search metadata is preserved separately in `src/data/seo.json`.
- `navigation` and `services`: menu and service names; destinations stay in JavaScript.
- `shared`: header, footer, contact forms/dialogs, search, accessibility controls,
  WhatsApp messages, and not-found text.
- `pages`: each page's headings, paragraphs, image descriptions, and lists.
  Landing-page institutional copy and testimonials are included here too.

Keep key names and value types unchanged when translating. Arrays preserve
paragraph/list order, and emphasis, links, and deliberate line breaks remain in
React rather than HTML strings. Named placeholders such as `{name}`, `{phone}`,
`{email}`, `{message}`, and `{page}` must be preserved in translated templates.
Whitespace in text fragments around inline elements is intentional.

The existing `public/data/tarifas.json` and `public/data/horarios.json` remain separate
with their original formats. They supply Spanish pricing/schedules, prices, year, colours and
ordering. English display-text overlays are in `en.json` under
`pages.tarifas.groups` and `pages.horarios.groups`, keyed by the original group
names and item IDs. Keep those overlays in sync when adding or changing entries.
Prices retain their Colombian formatting; `C/U` is displayed as `each` in English.

The menu's language button switches every page and shared component immediately
without reloading or clearing entered form values. It appears after Guidelines
(Protocolos) in the desktop service bar and after Contact us (Contáctenos) inside
the mobile hamburger menu. It shows `English` when Spanish is active and
`Español` when English is active (visually uppercase); there is no language dropdown. The explicit
choice is saved under `brazada-language` in local storage and retained across
navigation and reloads. Spanish is the default when there is no valid saved
choice; browser language settings never override it. If browser storage is
unavailable, switching still works for the current page and a warning is logged.

`LanguageProvider` and `useContent` supply the active language. Document language,
route title, description, accessibility labels and WhatsApp message templates
follow the selection. Routes do not change. Initial HTML always uses Spanish
content and the audited route metadata; React applies an explicitly saved
preference after loading. Original embedded
videos, maps, logos and the linked Spanish policy PDF are not translated.

### Updating production content over FTP (no rebuild)

The four editable files live in `public/data/` locally and are copied unchanged
to `dist/data/` by the build. After the initial deployment, edit/upload only:

- `/data/es.json`: Spanish text.
- `/data/en.json`: English text and English pricing/schedule overlays.
- `/data/tarifas.json`: prices, pricing groups, year and colours.
- `/data/horarios.json`: schedule groups and entries.

Upload them into the deployed site's `data/` directory, **not** a `public/`
directory. No JavaScript rebuild or upload is needed for these changes. Keep
your local `public/data/` copies synchronized so a later deployment does not
overwrite FTP changes.

React requests all four JSON files before rendering, using `cache: no-store`
and a timestamp query parameter. A new page load/reload fetches the latest data;
an already-open tab keeps its loaded copy until reloaded. Language switching
uses the loaded Spanish/English files without resetting forms. Files must be
valid UTF-8 JSON, publicly accessible without authentication or HTML fallback.
Configure the host/CDN not to cache `/data/*.json` (for example,
`Cache-Control: no-store`) or purge its cache after uploads if it ignores query
parameters. Upload to a temporary filename and rename when complete where FTP
supports it, to avoid serving a half-written file. Upload related files together.

Preserve translation keys, structures and named placeholders. When adding,
removing or renaming pricing/schedule groups or items, update the matching
English overlays in `en.json`; missing overlays display the base Spanish text.
Deleted schedule items are not retained from an outdated translation overlay.
Prices always come from `tarifas.json`, also in English.

Failed requests, invalid JSON, invalid core data structures and rendering errors
show a Spanish/English error with a Retry button, with details in the browser
console, instead of silently serving bundled prices or text.

**Static SEO limitation:** the initial Spanish HTML, audited SEO/schema and
`llms.txt`/`llms-full.txt` remain build-time snapshots. FTP JSON edits update the
JavaScript-rendered interface (including language-dependent metadata), not
those static files. Audited Spanish search titles/descriptions/schema remain
deliberately separate in `src/data/seo.json`. Crawlers that do not execute
JavaScript may see old visible text, prices or schedules until the affected
HTML/text files are regenerated or edited and uploaded too. To automatically
keep those responses synchronized from JSON on every request would require
server/edge rendering, outside this frontend-only deployment.

## SEO preservation and deployment

`src/data/seo.json` is a snapshot of the live site's public SEO, audited on
20 October 2026. For all 11 recreated pages, Spanish titles, descriptions,
canonical URLs, robots directives, Open Graph/Twitter tags, publication dates,
and **every JSON-LD block** are preserved exactly. This includes AIOSEO's
BreadcrumbList/Organization/WebPage/WebSite graphs, the homepage's additional
WebSite/ExerciseGym/LocalBusiness blocks, and the four retained service schemas.
For example, `/porque-brazada/` retains its original search title
`Sobre nosotros - Brazada`, rather than substituting its navigation label.
WordPress generator/RSS/oEmbed/admin tags are not part of the replacement app.

`npm run build` uses Vite and React's server renderer **at build time only** to
write a complete Spanish HTML file for every route, including its visible
content, metadata and schema. No server-side runtime, database, or network
request is required to build or host the site. `src/components/PageSeo.jsx`
keeps metadata in sync with the language button without duplicating tags.
English shares the Spanish canonical URL; it is a visitor-selected translation,
not a separate indexable URL, so there are no fictitious English hreflang URLs.

The build also writes `robots.txt`, `sitemap.xml`, `page-sitemap.xml`,
`sitemap_index.xml`, and a noindex `404.html`. The sitemaps contain the completed
pages only. Six images referenced by the retained schemas are kept under
their original `public/wp-content/uploads/...` paths so those schema references
continue working after WordPress is removed.

Preserved legacy details needing a separate, verified decision:

- The original schema and Open Graph metadata declare English (`en-US`/`en_US`)
  even though the pages are Spanish. The HTML document correctly declares `es`;
  the inherited schema/OG values are deliberately unchanged for this migration.
- Homepage business schemas contain an older landline and opening hours that
  differ from the visible contact/schedule information. They are not silently
  replaced, and historical modification timestamps are not fabricated.
- Some original schema URLs use HTTP. Preserve HTTP-to-HTTPS redirects at the
  host rather than changing entity IDs during migration.

Before replacing the public WordPress site:

1. Deploy on **https://brazada.net**, keeping the current path names and trailing
   slashes. Canonicals and schema IDs intentionally identify that domain.
2. Serve the generated `<route>/index.html` files, not a blanket rewrite of all
   requests to the homepage. Serve `404.html` with a real HTTP **404** status for
   unknown routes, and redirect slashless known routes to their trailing-slash
   versions. Configure this on the chosen host; a static file cannot set status.
3. Preserve existing HTTP/www redirects, the old uploads/PDF URLs and any
   externally linked assets. Only schema-referenced legacy images are copied
   here; this is not an export of the entire WordPress media library.
4. Inventory the remaining WordPress URLs before deleting them. Its current
   sitemap also includes the now-removed `/mente-y-cuerpo/`, `/jiu-jitsu/`,
   `/en-mantenimiento/`, portfolio, team and
   archive URLs outside this recreation's scope. Keep them served by the old
   site or implement individually appropriate pages/301 redirects; do not
   blanket-redirect them to the homepage or silently return homepage HTML.
5. Do not deploy an indexable staging copy. Apply hosting-level authentication
   or `X-Robots-Tag: noindex` on staging, **not** on the production domain.
6. Check real production status codes, robots, sitemap, Search Console URL
   Inspection and Rich Results Test, and monitor indexing/crawl errors after
   launch. No code migration can guarantee unchanged Google rankings.

## AI search discovery

The production build generates `/llms.txt` (a Spanish-first site guide) and
`/llms-full.txt` (service information, contact details, pricing and schedules).
They are derived from the same Spanish copy and pricing/schedule JSON used by
the pages, with links back to their canonical sources. These are build-time
snapshots: an FTP-only JSON update does not regenerate them. To keep AI text
current, also update/upload the corresponding text files, or synchronize the
local JSON and regenerate them on your next build. The development server also
serves these files as plain text. All pages link to `/llms.txt` in their head.
These files are an optional, emerging convention, **not** a supported indexing
requirement or a guarantee that any provider will read or cite them.

`scripts/ai-discovery.mjs` explicitly allows Googlebot, Bingbot, OAI-SearchBot,
ChatGPT-User, Claude-SearchBot and Claude-User in robots.txt. The existing
wildcard permission remains; no training-specific permission is changed.
Allowing search is distinct from allowing training: GPTBot, ClaudeBot and
Google-Extended have different purposes. User-directed fetches may not always
follow robots.txt. There is no invented Gemini crawler rule or special AI schema.
Existing Spanish SEO and JSON-LD remain untouched. The previously documented
legacy business-schema discrepancies still require a separate factual review.

After deploying to brazada.net:

- Confirm the text endpoints return HTTP 200 and `text/plain`, not the SPA HTML.
- Ensure the CDN/firewall does not challenge or block legitimate search
  crawlers; verify identity using providers' official IP/reverse-DNS guidance,
  not a user-agent string alone. robots.txt cannot override a firewall.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools. Keep
  Google Business Profile contact details, services and hours current.
- Check server logs for crawler visits and analytics for referral traffic.
  Visits do not prove inclusion, and robots changes do not submit the site
  directly to ChatGPT, Claude or Gemini. Indexing and citations are provider
  decisions; none can be guaranteed.
- Review the existing deployment checklist before replacing WordPress. This
  local implementation does not change the public site or provider accounts.

Provider guidance:
[OpenAI crawlers](https://developers.openai.com/api/docs/bots),
[Anthropic crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler),
[Google AI search features](https://developers.google.com/search/docs/appearance/ai-features),
and [Google crawler controls](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers).
Google states that AI Overviews/AI Mode use existing SEO fundamentals and require
no special AI markup. These Search features are not a promise of Gemini-app
inclusion.

## Social link previews

All completed pages include Open Graph metadata for Facebook, WhatsApp and
other compatible clients, plus X/Twitter `summary_large_image` cards. Existing
titles, descriptions, canonical URLs, schema and inherited locale values remain
unchanged; the sharing-image tags are additive.

`src/data/social.json` maps each route to a page-specific image and the locale
section used for its image description. `public/social/` contains compressed,
centre-cropped 1200 × 630 JPEGs made from the existing page banners. They use
stable absolute HTTPS URLs on brazada.net, include width/height/type/alt tags,
and are copied into the production build. When replacing one, preserve its
dimensions and update the mapping if its filename changes. Keep files below
500 KB. The image is not generated again from the source banner during builds.

Sharing bots receive the Spanish tags directly in the initial HTML without
JavaScript. The English interface updates the tags for visitors, but the same
shared URL has a Spanish-default preview; local-storage preferences cannot be
seen by external sharing crawlers. Instagram does not guarantee a link-preview
card in every surface (captions, stories and DMs differ).

After deployment, confirm `/social/*.jpg` is publicly accessible as
`image/jpeg` without authentication or bot challenges. Use Facebook's Sharing
Debugger to re-scrape cached URLs and inspect X/WhatsApp previews. Platforms may
cache previous cards, crop images differently, or omit cards; metadata cannot
force a particular rendering. Production preview testing requires deployment
because the image and canonical URLs intentionally use the real domain.

## Commands

- `npm run dev`: start the development server with hot reload.
- `npm run build`: create the production site in `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run lint`: check the source code with Oxlint.
- `npm run test:content`: verify public JSON deployment, runtime refresh/loading,
  validation and explicit error handling. Run after `npm run build`.
- `npm run test:seo`: verify the built pages' exact SEO/schema parity, crawlable
  content, local assets, English canonicals, sitemaps and noindex error pages.
  Run after `npm run build`.

Deploy `dist/` to a static hosting service after running `npm run build`, following
the route/status requirements above. Vite's development server supplies
route-specific SEO through its HTML transform; preview serves the generated
route files, but its SPA fallback is not a production 404/status configuration.
