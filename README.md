# Clara Weiss artist portfolio

A bilingual static portfolio for GitHub Pages. The artist name, biography, example email, studio notes, service examples and review images are sample content. The Ceramics cover is a generated placeholder.

## Run locally

There is no install or build step. With the checkout named `portfolio`, run this from its parent directory.

```sh
python3 -m http.server 8327 --bind 127.0.0.1
```

Open `http://127.0.0.1:8327/portfolio/` for the site and `http://127.0.0.1:8327/portfolio/admin/` for the editor. Serving the parent directory exercises the same project subpath as GitHub Pages. GitHub Pages serves the repository root directly, with `.nojekyll`.

Use `?lang=en` or `?lang=de` to test each locale. The language switcher preserves the page and its `id` query parameter. Direct detail URLs include `article.html?id=by-the-water&lang=en` and `service.html?id=painting-classes&lang=de`.

## Edit content with Sveltia

Open the production [Content Manager](https://hqmap.github.io/portfolio/admin/) once the revision is deployed. The admin uses Sveltia CMS **0.273.1**, the GitHub backend for `hqmap/portfolio` and simple publishing. Only the admin downloads Sveltia.

1. In **Artwork Library**, create an artwork and upload or select an image. The ID is generated automatically. The title, medium, year, physical dimensions, description and alt text can be left blank. Add English and German descriptions and alt text in their respective locales.
2. In **Portfolio Galleries & Covers**, open a gallery and choose **Add Artwork** under **Artwork order**. Select a work by title or image filename. In the English pane, drag the list item handles or use the move controls. The German pane follows the same order. A work can appear in multiple galleries.
3. In the same gallery entry, choose **Cover artwork** or select or upload a **Dedicated cover image**. A dedicated image takes precedence. Clearing that field returns the preview to the selected artwork. If the dedicated file is unavailable, the site tries the cover artwork. If that reference is unavailable, it uses the first available gallery work.
4. In **Website Pages → Homepage**, change **Featured artwork**. The artwork selection is shared. If the selection is missing, the page uses the first available work in the library.
5. In **Services & Commissions**, add the English and German titles and descriptions and choose a cover. Add optional photographs with translated captions and alt text. Use the collection's reorder control to change the sequence shown on the public overview. An inquiry requires a destination and a label for the language where it should appear.
6. Edit the biography, contact details and other overview copy under **Website Pages**. Manage posts under **News Articles** and the name and navigation labels under **Website Settings**. Use **Assets** to browse uploaded images.

To show the Instagram icon, add your profile name and full Instagram profile URL under **Website Pages → Contact → Social links** in the English pane. The navigation uses the first valid Instagram profile URL for both languages. When the list contains no valid Instagram profile URL, the icon takes up no space.

The preview pane uses the public fonts and colors and shows draft content, including images, formatted text and gallery order. Its gallery preview uses simple columns. The public pages provide masonry placement, the artwork viewer and complete site navigation. Existing images may be selected through the Asset Library, and uploads are optimized to WebP at quality 94 with a 2800 px bounding box. Artwork images keep their aspect ratios. Retain separate archival scans. The public gallery and viewer share the full optimized image.

### Owner sign-in and publishing

1. In GitHub, open **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Choose the repository owner as the resource owner, set an expiration, select **Only select repositories**, and choose `hqmap/portfolio`.
3. Under repository permissions grant **Contents: Read and write**. GitHub adds **Metadata: Read** automatically. The simple workflow uses the contents permission.
4. On the admin page, choose **Sign In Using Access Token** and paste the token there. Sveltia remembers this sign-in in the browser. Keep the token in a password manager and sign out on shared devices.
5. Review edits in the preview and choose **Save**. Sveltia commits directly to `main`, and GitHub Pages serves the update after its deployment completes. The publishing account must be allowed to write to that branch under the repository's branch rules.
6. Choose **Sign Out** in the user menu to remove the browser's session. When the token expires, create its replacement with the same repository access, sign out if necessary, and use **Sign In Using Access Token** again. Revoke the old token in GitHub after confirming the replacement works.

See [Sveltia's GitHub backend instructions](https://sveltiacms.app/docs/backends/github) and [GitHub's token settings guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

## Content files

The CMS uses `single_file` internationalization. A page file contains `{"en": {...}, "de": {...}}`. Each entry in an artwork, service or news array uses the same shape. The CMS copies fields marked `duplicate` from English to German. The service photo list synchronizes its images and order from either locale. The public site reads shared values from English and translated fields from the selected locale. Blank optional captions stay blank in that language.

| File | Shape and relationships |
|---|---|
| `content/artworks.json` | Array. `id`, `image`, `year` and `dimensions` are shared. `title`, `medium`, `description` and `alt` are translated. |
| `content/galleries/*.json` | One file per existing category. Shared `cover` is an artwork ID and `coverImage` is an optional dedicated image. `works` is an ordered list of `{"artwork": "artwork-id"}` items. |
| `content/home.json` | Shared `featured` artwork ID with translated page title and Selected Collections text. |
| `content/services.json` | Ordered array. `id`, `coverImage`, photo image paths, photo order and `inquiryUrl` are shared. Photo captions and alt text, title, intro, body, cover alt text and inquiry label are translated. |
| `content/news.json` | Array with stable `id`, shared publication date and optional artwork ID or dedicated cover. Titles, summaries, articles and image descriptions are translated. The public list sorts by date. |
| `content/{about,contact,portfolio,services-overview,news-overview,settings}.json` | Individual pages and settings. About Me can use an uploaded photo or an artwork reference. Contact holds the shared email, optional phone and social links. |

`artworks.json` replaces the earlier ID-keyed object. The old combined gallery and page files were split to give each entry a dedicated CMS form. The migration kept the existing artwork and article IDs, gallery order and references, and seed content. The original service copy now appears under Commissions. The retired homepage introduction is preserved in the history of `content/home.json`.

Uploaded image paths look like `/portfolio/images/name.webp` and resolve relative to the project root on public pages. Legacy `pixelSize` metadata in an artwork's English object is optional and used only when it names the current image. The browser also checks its intrinsic size on load. Physical artwork dimensions are an optional caption field.

Sveltia stores formatted text as HTML. The public renderer retains common editorial elements and checks link and image schemes while rebuilding the markup. The font licenses accompany the local WOFF2 files.

## Verify in a disposable copy

The public pages can be served at `/portfolio/` and tested in a browser without signing in. For CMS edits, use a copy of the checkout and [Sveltia's local development workflow](https://sveltiacms.app/docs/workflows/local) in a supported Chromium browser. The [Test backend](https://sveltiacms.app/docs/backends/test) can also seed the site's JSON and images for a browser-only round trip. Keep the production config on the GitHub backend.

Test both languages and check the gallery order, covers, homepage artwork and service URLs after saving. On the homepage, check the spacing above landscape and portrait featured artwork at desktop and mobile widths. The repository owner's authenticated PAT login and first live publishing check take place on the deployed revision.

Open an artwork in each language and check the viewer at desktop, portrait phone and landscape phone sizes. On desktop the title, centered arrows and metadata share a bottom row. On a portrait phone the caption sits below the image and the arrows stay at the bottom. On a short landscape screen the arrows and Close sit at the top. Check long and empty captions, single-artwork galleries, 130% zoom and drag, swipes, and keyboard navigation with focus returning to the artwork trigger on close.
