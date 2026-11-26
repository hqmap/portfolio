# Clara Weiss artist portfolio prototype

Serve the checkout with a static HTTP server. From the parent directory run `python3 -m http.server 8000 --bind 127.0.0.1` and open the project's `/portfolio/` path. GitHub Pages can serve the repository root directly with no install or build step.

## Design and content

The fictional artist name, biography, example.com address, studio note and generated watercolor studies are review material. Replace these before publication. The homepage pairs a warm paper ground and local Cormorant Garamond and Source Sans 3 fonts with a single featured painting. Category covers use consistent crops. Gallery and viewer images retain their authored proportions, including two explicitly titled detail studies.

The HTML entry points share one JavaScript module and stylesheet. Links and JSON asset paths resolve from the project root relative to that module. Each entry has a direct static URL. The language query takes precedence over the stored choice and browser language. Switching languages keeps the page and article identifier.

Edit the files in `content/` to change the artist settings, page text, news or artwork. Translations share an entry as `en` and `de` fields. Collection covers reference artwork keys, and each collection’s `works` array defines the public display order for both languages. This structure can be mapped to Sveltia file collections in the next stage. The prototype renders editable copy as plain text. Font licenses accompany the locally hosted WOFF2 files.
