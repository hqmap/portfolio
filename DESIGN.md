# Artist Portfolio — Website Design Document

**Version:** 1.0 — Initial concept  
**Project type:** Bilingual artist portfolio  
**Languages:** English and German  
**Hosting:** GitHub Pages  
**Content management:** Sveltia CMS

---

## 1. Project overview

The project is a lightweight, responsive portfolio website showcasing the artist's work, with particular emphasis on watercolor paintings, illustration and creative projects.

The website should provide an elegant visual presentation of the artwork, introduce the artist, communicate available services, facilitate commissions and allow visitors to follow the artist's activities through news publications.

The artist must be able to independently maintain the website through a user-friendly graphical content management interface, without programming knowledge.

### Primary objectives

- Present artwork in an attractive, professional and accessible manner.
- Establish a distinctive visual identity reflecting the artist's artistic style.
- Provide a bilingual experience in English and German.
- Ensure excellent usability on desktop computers, tablets and smartphones.
- Allow independent content management by the artist.
- Maintain minimal technical complexity and external dependencies.
- Avoid recurring hosting and software subscription costs within the hosting service's free-tier limits.
- Ensure long-term maintainability and portability.

## 2. Website structure

### 2.1. Main navigation

The following navigation labels are adapted to natural English and German terminology commonly used on artist portfolio websites.

| Ukrainian reference | English | German |
|---|---|---|
| Портфоліо | Portfolio | Portfolio |
| Послуги і замовлення | Services & Commissions | Leistungen & Auftragsarbeiten |
| Про мене | About Me | Über mich |
| Новини | News | Aktuelles |
| Контакти | Contact | Kontakt |

The artist's name, displayed in the upper-left corner, functions as a link to the homepage.

A language switcher labelled **EN / DE** is positioned alongside the main navigation.

### 2.2. Portfolio categories

| Ukrainian reference | English | German |
|---|---|---|
| Дизайн | Design | Design |
| Ілюстрація | Illustration | Illustration |
| Портрети | Portraits | Porträts |
| Творчі проєкти | Creative Projects | Künstlerische Projekte |

Each category has its own dedicated gallery page.

### 2.3. Sitemap

- Home
- Portfolio
  - Design
  - Illustration
  - Portraits
  - Creative Projects
- Services & Commissions
- About Me
- News
  - Individual news articles
- Contact

All public pages are available in both languages.

## 3. Visual identity and design direction

### 3.1. General aesthetic

The visual identity should be inspired by watercolor painting, traditional art materials, fine-art exhibition catalogues and contemporary editorial design.

The intended atmosphere is:

- Light and airy.
- Elegant but not excessively decorative.
- Organic and tactile.
- Calm and welcoming.
- Personal rather than corporate.
- Timeless rather than trend-driven.

The artwork itself should remain the dominant visual element. Interface elements should complement the paintings without competing with their colors or composition.

### 3.2. Background and textures

The primary background should use a warm off-white color with an optional subtle watercolor paper texture.

The texture should be:

- Fine-grained and natural-looking.
- Low contrast.
- Seamlessly repeatable.
- Lightweight and locally hosted.
- Subtle enough not to interfere with text readability or artwork reproduction.

Restrained watercolor washes may be used in selected decorative areas, such as the homepage or section transitions. Decorative elements should not be applied indiscriminately throughout the website.

### 3.3. Proposed color palette

| Purpose | Color | HEX |
|---|---|---|
| Main background | Warm watercolor paper | #F8F5EE |
| Secondary background | Light ivory | #FDFBF7 |
| Primary text | Warm charcoal | #383630 |
| Secondary text | Muted grey-brown | #77736B |
| Primary accent | Muted sage green | #879785 |
| Secondary accent | Dusty terracotta | #C28F7D |
| Alternative accent | Muted watercolor blue | #91A9BC |
| Dividers and borders | Pale warm grey | #DED9CF |

The palette is provisional and should be refined after reviewing the artist's actual work.

Accent colors should primarily be used for decoration, hover states and selected interface elements. Text and interactive controls must maintain sufficient contrast.

### 3.4. Typography

Typography should combine artistic elegance with practical readability.

**Artist's name**

A distinctive, refined serif, calligraphic or handwritten typeface. It should resemble a personal signature or an editorial wordmark without becoming difficult to read.

**Headings**

An elegant serif typeface, with generous spacing and a restrained hierarchy.

Potential typefaces:

- Cormorant Garamond
- EB Garamond
- Bodoni Moda
- Playfair Display

**Body text and navigation**

A clean, understated sans-serif or highly readable serif typeface.

Potential typefaces:

- Jost
- Lato
- Source Sans 3

All selected fonts must support German characters and be hosted locally in optimized WOFF2 format.

### 3.5. Interface styling

- Generous whitespace.
- Minimal borders and separators.
- Predominantly rectangular artwork presentation.
- Subtle hover transitions.
- Little or no artificial drop shadows.
- No gradients or prominent interface decorations unless artistically justified.
- No intrusive animations, automatic carousels or distracting visual effects.

The website should evoke the experience of browsing a physical artist's portfolio.

## 4. Global website layout

### 4.1. Header

The desktop header consists of three primary elements:

- Artist's name or wordmark on the left.
- Main horizontal navigation on the right.
- English/German language switcher.

The active page is indicated by a subtle underline or accent color.

The header should be consistent across all pages, with sufficient vertical space to create a calm, uncluttered appearance.

### 4.2. Content area

The main content area should use a centered, responsive layout with a maximum width of approximately 1440 pixels.

Text-oriented pages should have a narrower reading area, while galleries should make more extensive use of the available screen width.

### 4.3. Footer

A minimal footer containing:

- Artist's name.
- Copyright notice.
- Contact email.
- Social media links, if applicable.
- Privacy and legal information, where applicable.

The footer should remain visually secondary to the main content.

## 5. Individual page designs

### 5.1. Homepage

The homepage serves as a concise visual introduction to the artist.

Proposed content:

- One prominent representative artwork.
- Artist's name or short introductory statement.
- Brief introduction to the artist's creative practice.
- Link to the portfolio.
- Optional selection of featured works or the latest news item.

The homepage should not become a lengthy promotional landing page. Its primary purpose is to establish the visual identity and invite visitors to explore the artwork.

The main image and introductory text should be editable through the CMS.

### 5.2. Portfolio overview

The portfolio overview displays four distinct categories:

- Design.
- Illustration.
- Portraits.
- Creative Projects.

Each category is represented by a large preview image and category title.

Desktop layout:

- Two-column, two-row image grid.
- Generous spacing between categories.
- Consistent image preview proportions.

Mobile layout:

- Single-column arrangement on narrow screens.
- Large, easily tappable previews.

Clicking anywhere within a category preview opens the corresponding gallery page.

The artist should be able to independently select and replace each category's cover image through the CMS.

### 5.3. Category gallery pages

Each category has its own dedicated page containing:

- Category heading.
- Optional introductory text.
- Gallery of artworks.
- Link back to the portfolio overview.

The gallery should preserve the original aspect ratio of each artwork. Paintings must not be cropped merely to achieve a uniform grid.

An adaptive, row-based or masonry-inspired layout should accommodate a mixture of portrait, landscape and square artworks while respecting the artist's selected ordering.

The gallery layout should adapt to the available screen width.

**Artwork information**

Each artwork may include:

- Primary image.
- Additional photographs or detail views.
- Title.
- Year of creation.
- Medium or technique.
- Dimensions.
- Description.
- Alternative text for accessibility.

Only the primary image is mandatory. Other fields may be left empty.

**Manual artwork ordering**

The artist must be able to rearrange artworks through drag-and-drop controls in Sveltia CMS.

The public gallery must follow the saved order rather than automatically sorting by date, filename or title.

The ordering is shared between English and German.

**Expanded artwork viewer**

Clicking an artwork opens a fullscreen or near-fullscreen lightbox containing:

- A larger version of the artwork.
- Optional artwork information.
- Previous and next navigation.
- Close button.
- Keyboard navigation.
- Touch swipe navigation on mobile devices.

The artwork should fit within the screen without cropping. Background distractions should be minimized.

### 5.4. Services & Commissions

A text-oriented page describing the artist's available services and commissioned work.

Potential sections:

- Available artistic services.
- Custom watercolor paintings.
- Portrait commissions.
- Illustration and design services.
- Commission process.
- Pricing information, if desired.
- How to submit an inquiry.
- Examples of commissioned works.

The page may include photographs and links to relevant galleries.

Text, images and section headings should be editable through the CMS.

The initial implementation will use placeholder content.

### 5.5. About Me

An editorial-style biography page presenting the artist's personal and professional background.

Potential content:

- Artist's portrait photograph.
- Biography.
- Artistic philosophy.
- Education and experience.
- Exhibitions and achievements.
- Creative techniques and materials.

On desktop, the page may use an asymmetric two-column layout combining photography and text.

On mobile, the content should flow naturally in a single column.

The artist's photograph and biography must be editable through the CMS.

### 5.6. News

A chronological collection of publications managed through Sveltia CMS.

Potential publication types:

- Exhibition announcements.
- New artworks.
- Completed projects.
- Artistic events.
- Awards and achievements.
- Personal creative updates.

The news overview displays entries in reverse chronological order.

Each entry includes:

- Publication date.
- Cover image, if provided.
- Title.
- Short introductory excerpt.
- Link to the complete article.

Individual articles contain formatted text, images, links and optional image captions.

Each article has a unique, shareable URL.

The artist should be able to create, edit, preview, publish and delete articles independently.

### 5.7. Contact

A simple and welcoming page providing contact information.

Potential content:

- Short introductory message.
- Email address.
- Telephone number, if desired.
- Social media profiles.
- Studio location, if relevant.
- Commission inquiry information.

Email links should open the visitor's preferred email application.

A server-based contact form is not required for the initial version, avoiding additional hosting and third-party service dependencies.

## 6. Multilingual functionality

The website will support English and German using Sveltia CMS's built-in internationalization features.

### Language behavior

- English is proposed as the default language.
- German-speaking visitors may automatically receive the German version on their first visit.
- Visitors can change languages on any page.
- Changing languages preserves the current page, category or article.
- The selected language is remembered locally.
- Language-specific URLs can be copied and shared.
- The language switcher uses language names or abbreviations rather than national flags.

### Translatable and shared content

| Content field | Behavior |
|---|---|
| Page headings | Translated |
| Page text | Translated |
| Artwork titles | Translated |
| Artwork descriptions | Translated |
| Artwork technique | Translated |
| Image alternative text | Translated |
| News titles and articles | Translated |
| Artwork photographs | Shared |
| Gallery ordering | Shared |
| Artwork dimensions | Shared |
| Creation year | Shared |
| Publication dates | Shared |
| Contact details | Shared |

Translations should be managed within the same CMS entry to minimize duplicated work.

Images must not need to be uploaded separately for each language.

## 7. Content management system

### 7.1. Platform

Sveltia CMS will provide the administrative interface.

The interface will be accessible at:

`https://website-address/admin/`

It will operate independently of the public-facing website.

### 7.2. CMS content organization

The administration interface should contain clearly labelled content sections:

**Website pages**

- Homepage.
- Portfolio overview.
- Services & Commissions.
- About Me.
- Contact.

**Artwork galleries**

- Design.
- Illustration.
- Portraits.
- Creative Projects.

**Publications**

- News articles.

**Settings**

- Artist's name.
- Contact information.
- Social media links.
- General website settings.

**Media library**

- Artwork images.
- News photographs.
- Portrait photographs.
- Other uploaded media.

The interface should expose content-related settings only. Structural website code and technical configuration should remain outside the artist's normal editing workflow.

### 7.3. Editing functionality

The artist should be able to:

- Edit page text using a visual rich-text editor.
- Upload and replace images.
- Create and delete artworks.
- Rearrange artworks using drag-and-drop.
- Change portfolio category cover images.
- Add artwork information.
- Create and edit news articles.
- Manage English and German translations.
- Preview content before publishing.
- Update contact details and social media links.

### 7.4. Live preview

Sveltia CMS's preview interface should be customized to resemble the public website as closely as practical.

Custom preview templates and styles should be provided for:

- Text-oriented pages.
- Artwork galleries.
- Individual artworks.
- News articles.

The preview should reflect the website's typography, colors, image proportions and general content layout.

Exact reproduction of the complete responsive website within the CMS preview is not essential.

### 7.5. Authentication

Authentication will use a GitHub Personal Access Token (PAT).

The token should:

- Be fine-grained.
- Be restricted to the portfolio repository.
- Have only the necessary repository permissions.
- Be stored securely.
- Never be embedded in public website code or committed to the repository.

Initial authentication will be configured on the artist's laptop.

The artist will receive brief instructions covering normal use, signing in again and token renewal.

No external OAuth authentication service is required.

### 7.6. Publishing workflow

1. The artist opens the administration page.
2. Selects a page, gallery or news article.
3. Edits the relevant content.
4. Reviews the preview.
5. Saves or publishes the changes.
6. Sveltia CMS commits the updated files to GitHub.
7. GitHub Pages automatically deploys the updated website.

Previous published versions remain recoverable through Git's version history.

The initial implementation will use a simple publishing workflow rather than a complex editorial approval system.

## 8. Image management and optimization

Image quality is particularly important because the website presents fine art.

### Upload processing

Sveltia CMS should be configured to optimize uploaded photographs automatically.

Proposed initial settings:

- Maximum long-edge resolution: approximately 2400–3000 pixels.
- Optimized WebP output.
- High compression quality, approximately 90–95.
- Preservation of original aspect ratio.
- No automatic cropping.
- No automatic color enhancement or sharpening.

These settings should be tested using representative watercolor paintings before finalizing them.

Particular attention should be paid to delicate color transitions, paper texture, fine brushwork and subtle low-contrast details.

Original high-resolution artwork photographs should be archived separately rather than relying on the website as the artist's primary image archive.

### Public website image loading

- Lazy loading of off-screen images.
- Appropriate image dimensions to prevent layout shifts.
- Optimized thumbnails where practical.
- Higher-resolution images for expanded artwork viewing.
- Responsive image presentation.
- Preservation of accurate color appearance using suitable sRGB source files.

Automatic generation of separate thumbnail files may require additional implementation in the CMS. The initial version may use a single optimized image per artwork to preserve technical simplicity.

## 9. Responsive design

The website should be designed for screen widths ranging from approximately 320 pixels to large desktop displays.

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Navigation | Horizontal | Adaptive | Collapsible |
| Category overview | 2 columns | 2 columns | 1 column |
| Artwork gallery | 3–4 columns or adaptive rows | 2–3 columns | 1–2 columns |
| Biography | Image and text | Adaptive | Stacked |
| News overview | 2–3 columns | 2 columns | 1 column |
| Artwork viewer | Fullscreen overlay | Fullscreen overlay | Touch-friendly fullscreen |

Additional requirements:

- No horizontal scrolling at normal viewport widths.
- Comfortable reading sizes.
- Adequately sized touch targets.
- No essential functionality dependent on mouse hover.
- Easily accessible language selection.
- Support for portrait and landscape device orientations.
- Responsive image and text sizing.

## 10. Technical architecture

### 10.1. Technology stack

| Component | Technology |
|---|---|
| Website structure | HTML5 |
| Styling | CSS3 |
| Interactive functionality | Vanilla JavaScript |
| Content storage | JSON |
| Content management | Sveltia CMS |
| Version control | Git |
| Repository | GitHub |
| Hosting | GitHub Pages |
| Authentication | GitHub PAT |
| Database | None |
| Backend server | None |
| Build process | None |

No static site generator, JavaScript framework, Node.js environment or package manager is required for website deployment.

### 10.2. Proposed repository structure

    portfolio/
    ├── index.html
    ├── portfolio.html
    ├── galleries/
    │   ├── design.html
    │   ├── illustration.html
    │   ├── portraits.html
    │   └── creative-projects.html
    ├── services.html
    ├── about.html
    ├── news.html
    ├── article.html
    ├── contact.html
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── main.js
    │   ├── content.js
    │   ├── gallery.js
    │   └── language.js
    ├── content/
    │   ├── settings.json
    │   ├── home.json
    │   ├── portfolio.json
    │   ├── services.json
    │   ├── about.json
    │   ├── contact.json
    │   ├── news.json
    │   └── galleries/
    │       ├── design.json
    │       ├── illustration.json
    │       ├── portraits.json
    │       └── creative-projects.json
    ├── images/
    │   ├── artworks/
    │   ├── news/
    │   ├── pages/
    │   └── textures/
    ├── fonts/
    ├── admin/
    │   ├── index.html
    │   ├── config.yml
    │   ├── preview.js
    │   └── preview.css
    ├── favicon.svg
    ├── .nojekyll
    └── README.md

### 10.3. Content rendering

JavaScript will load the relevant JSON content files and render the requested language version.

Each gallery will use an ordered list of artwork entries. Reordering entries in the CMS changes their sequence in the corresponding JSON file.

News articles may use stable identifiers, enabling individual URLs such as:

`article.html?id=summer-exhibition&lang=en`

`article.html?id=summer-exhibition&lang=de`

The website must support direct navigation to these URLs without requiring custom server-side routing.

### 10.4. External dependencies

External dependencies should be kept to a minimum.

- Sveltia CMS, loaded only in the administration interface.
- An optional lightweight Markdown renderer for rich-text content.
- Locally hosted fonts.
- Locally hosted images and decorative textures.
- Native browser functionality wherever possible.

CMS and library versions should be pinned to tested releases.

No external analytics, tracking scripts, advertising or unnecessary CDN resources should be included by default.

## 11. Performance and accessibility

### Performance requirements

- Minimal HTML, CSS and JavaScript payload.
- No unnecessary frontend frameworks.
- Fast initial page rendering.
- Deferred loading of nonessential resources.
- Lazy-loaded galleries.
- Optimized fonts and textures.
- Minimal visual layout shifts.
- Usability over slower mobile connections.

The CMS must not introduce additional downloads or processing overhead for ordinary website visitors.

### Accessibility requirements

- Semantic HTML.
- Keyboard-accessible navigation and galleries.
- Visible keyboard focus indicators.
- Descriptive image alternative text.
- Sufficient text contrast.
- Appropriate heading hierarchy.
- Correct document language attributes.
- Accessible fullscreen artwork viewer.
- Respect for reduced-motion system preferences.

### Search engine optimization

- Descriptive page titles.
- Page descriptions.
- Human-readable page paths where practical.
- Appropriate heading structure.
- Shareable bilingual URLs.
- Sitemap and robots.txt where useful.
- Basic social media preview metadata.

The no-build architecture means that dynamically loaded article content and article-specific metadata may not be recognized by every search engine or social media crawler. This is an accepted initial trade-off for architectural simplicity.

## 12. Security and maintenance

- HTTPS through GitHub Pages.
- Repository-restricted authentication credentials.
- No publicly exposed private tokens.
- Sanitization of rendered rich-text content.
- Git-based change history and recovery.
- Periodic repository backups.
- Independent archival of original artwork photographs.
- Monitoring of repository and published website size.
- Occasional review of CMS and dependency updates.

Content management should remain separate from website structure, reducing the risk of accidental design changes.

## 13. Initial development scope

The first implementation will include:

- Complete bilingual website structure.
- Placeholder text for all pages.
- Representative placeholder artwork images.
- Responsive header, navigation and footer.
- Four functional portfolio category galleries.
- Fullscreen artwork viewer.
- News overview and individual article pages.
- Language switching and persistence.
- Sveltia CMS configuration.
- Drag-and-drop artwork ordering.
- Shared bilingual image management.
- Automatic upload optimization.
- Customized CMS previews.
- GitHub Pages deployment configuration.
- Basic administration instructions for the artist.

The initial version will not include e-commerce, payment processing, user accounts, server-based contact forms or complex editorial workflows.

## 14. Final design principles

The finished website should feel like a small, carefully curated online art exhibition.

The technical infrastructure should remain invisible to both visitors and the artist. Visitors should be able to focus on the artwork, while the artist should be able to maintain the portfolio without dealing with programming, deployment procedures or file structures.

**Art first. Simplicity, elegance and independence throughout.**
