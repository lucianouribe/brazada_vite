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
Spanish page copy and interface labels are in `src/data/es.json`.
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
`/hidrogimnasia/`, `/masajes/`, `/protocolos/`, `/tarifas/`, and `/horarios/`. The remaining pages
intentionally have blank main content until they are built.
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
`src/data/tarifas.json`. Update that file to change prices without editing JSX.
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

Horarios reads its five schedule groups from `src/data/horarios.json`.
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

Edit `src/data/es.json` for Spanish and `src/data/en.json` for English without
editing components. Brazada remains the company name in both languages:

- `metadata`: document language, default title, route title template, and description.
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

The existing `src/data/tarifas.json` and `src/data/horarios.json` remain separate
and unchanged. They supply Spanish pricing/schedules, prices, year, colours and
ordering. English display-text overlays are in `en.json` under
`pages.tarifas.groups` and `pages.horarios.groups`, keyed by the original group
names and item IDs. Keep those overlays in sync when adding or changing entries.
Prices retain their Colombian formatting; `C/U` is displayed as `each` in English.

The menu's language button switches every page and shared component immediately
without reloading or clearing entered form values. It appears after Guidelines
(Protocolos) in the desktop service bar and after Contact us (Contáctenos) inside
the mobile hamburger menu. It shows `English` when Spanish is active and
`Español` when English is active; there is no language dropdown. The explicit
choice is saved under `brazada-language` in local storage and retained across
navigation and reloads. Spanish is the default when there is no valid saved
choice; browser language settings never override it. If browser storage is
unavailable, switching still works for the current page and a warning is logged.

`LanguageProvider` and `useContent` supply the active language. Document language,
route title, description, accessibility labels and WhatsApp message templates
follow the selection. Routes do not change. `vite.config.js` always inserts
Spanish metadata into the initial static HTML, including production builds;
React applies an explicitly saved preference after loading. Original embedded
videos, maps, logos and the linked Spanish policy PDF are not translated.

## Commands

- `npm run dev`: start the development server with hot reload.
- `npm run build`: create the production site in `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run lint`: check the source code with Oxlint.

Deploy `dist/` to a static hosting service after running the build. Configure the
host to rewrite non-file requests to `index.html`, so opening or refreshing local
page routes such as `/natacion/` works. Vite's dev and preview servers already
provide this fallback.
