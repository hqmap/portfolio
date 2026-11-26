const root = new URL('../', import.meta.url);
const page = document.body.dataset.page;
const query = new URLSearchParams(location.search);
let preference;
try { preference = localStorage.getItem('catalogue-language'); } catch {}
const language = [query.get('lang'), preference, navigator.language.split('-')[0]].find(value => ['en','de'].includes(value)) || 'en';
try { localStorage.setItem('catalogue-language', language); } catch {}
document.documentElement.lang = language;
const t = field => field[language];
const ui = (en, de) => language === 'de' ? de : en;

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value !== undefined) node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

async function load(name) {
  const response = await fetch(new URL('content/' + name + '.json', root));
  if (!response.ok) throw Error(response.statusText);
  return response.json();
}

function url(path, params = {}) {
  const target = new URL(path + '.html', root);
  target.search = new URLSearchParams({lang: language, ...params});
  return target.href;
}

const arrow = (diagonal = false) => el('span', {class:'arrow', 'aria-hidden':'true'}, diagonal ? '↗' : '→');
const link = (path, label, style = '') => el('a', {href:url(path), class:style}, label, arrow());
const main = document.querySelector('main');

async function render() {
  const [settings, home, works, collections, pages, articles] = await Promise.all(
    ['settings','home','artworks','collections','pages','news'].map(load)
  );
  const collection = collections.find(item => item.id === page);
  const article = articles.find(item => item.id === query.get('id'));
  const active = collection ? 'portfolio' : page === 'article' ? 'news' : page;
  const nav = el('nav', {id:'navigation', 'aria-label':ui('Main navigation','Hauptnavigation')});
  for (const [id, title] of Object.entries(settings.navigation)) {
    nav.append(el('a', {href:url(id), 'aria-current':active === id ? 'page' : undefined}, t(title)));
  }
  const languages = el('div', {class:'languages'});
  for (const code of ['en','de']) {
    const target = new URL(location.href);
    target.searchParams.set('lang', code);
    if (code === 'de') languages.append(el('span', {'aria-hidden':'true'}, '/'));
    languages.append(el('a', {href:target.href, lang:code, hreflang:code, 'aria-label':code === 'en' ? 'English' : 'Deutsch', 'aria-current':language === code ? 'true' : undefined}, code.toUpperCase()));
  }
  const menu = el('button', {class:'menu', 'aria-controls':'navigation', 'aria-expanded':'false'}, 'Men' + ui('u','ü'), el('i', {'aria-hidden':'true'}));
  function toggle(open) {
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  }
  menu.onclick = () => toggle(menu.getAttribute('aria-expanded') === 'false');
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { toggle(false); menu.focus(); }
  });
  const brand = () => el('a', {class:'brand',href:url('index')}, settings.artist);
  document.querySelector('header').append(el('a', {class:'skip',href:'#main'},ui('Skip to content','Zum Inhalt')), el('div', {class:'mast wrap'}, brand(), nav, languages, menu));
  const email = () => el('a', {href:'mailto:' + settings.email}, settings.email);
  document.querySelector('footer').append(el('div', {class:'wrap foot'}, brand(), el('small', {}, '© ' + new Date().getFullYear() + ' ' + settings.artist), email()));
  const image = (key, eager = false) => {
    const w = works[key];
    return el('img', {src:new URL(w.image,root).href, width:w.width,height:w.height,alt:t(w.alt),loading:eager ? 'eager' : 'lazy', decoding:'async'});
  };
  function caption(key) {
    const w = works[key];
    return el('figcaption', {}, el('em', {},t(w.title)), el('span', {}, [w.medium && t(w.medium), w.year].filter(Boolean).join(' · ')));
  }
  function previews(compact) {
    return el('div', {class:'collections' + (compact ? ' compact' : '')}, ...collections.map(c =>
      el('a', {href:url('galleries/'+c.id)}, image(c.cover), el('h3', {},t(c.title),arrow(true)))
    ));
  }
  const sectionTitle = (title, intro) => el('div',{class:'section-title'},el('h1',{},title),el('p',{},intro));
  let title;
  if (page === 'index') {
    title = ui('Watercolor & illustration','Aquarell & Illustration');
    main.append(el('section', {class:'hero wrap'},
      el('div', {class:'intro'}, el('p',{class:'eyebrow'},t(home.label)),
        el('h1',{},t(home.heading),el('em',{},t(home.emphasis))), el('p',{class:'lead'},t(home.intro)),
        link('portfolio',ui('Explore portfolio','Portfolio entdecken'),'button')),
      el('figure',{class:'feature'},image(home.featured,true),caption(home.featured))),
      el('section',{class:'selected'},el('div',{class:'wrap'},el('div',{class:'section-bar'},el('h2',{},t(home.selected)),link('portfolio',ui('View portfolio','Zum Portfolio'),'text-link')),previews(true))));
  } else if (collection) {
    title = t(collection.title);
    const gallery = el('div',{class:'gallery'});
    const triggers = [];
    collection.works.forEach((key,index) => {
      const button = el('button',{class:'art-button','aria-label':t(works[key].title)},image(key));
      button.onclick = () => show(index);
      triggers.push(button);
      gallery.append(el('figure',{},button,caption(key)));
    });
    const dialog = el('dialog',{'aria-label':ui('Artwork viewer','Werkansicht')});
    const stage = el('figure',{'aria-live':'polite'});
    const close = el('button',{},ui('Close','Schließen'),' ×');
    close.onclick = () => dialog.close();
    const prev = el('button',{'aria-label':ui('Previous work','Vorheriges Werk')},'←');
    const next = el('button',{'aria-label':ui('Next work','Nächstes Werk')},'→');
    let current = 0;
    let opener;
    function show(index) {
      current = (index + triggers.length) % triggers.length;
      const key = collection.works[current];
      stage.replaceChildren(image(key,true),caption(key));
      if (!dialog.open) { opener = triggers[current]; dialog.showModal(); }
    }
    prev.onclick = () => show(current-1);
    next.onclick = () => show(current+1);
    dialog.onclose = () => opener?.focus();
    dialog.onkeydown = e => {
      if (e.key === 'ArrowRight') next.click();
      if (e.key === 'ArrowLeft') prev.click();
    };
    let start;
    dialog.ontouchstart = e => { start = e.changedTouches[0].clientX; };
    dialog.ontouchend = e => {
      const dx = e.changedTouches[0].clientX - start;
      if (Math.abs(dx) > 60) show(current + (dx < 0 ? 1 : -1));
    };
    dialog.append(el('div',{class:'viewer-controls'},close),stage);
    if (triggers.length > 1) dialog.append(el('div',{class:'steps'},prev,next));
    main.append(el('section',{class:'wrap interior'},el('a',{class:'back',href:url('portfolio')},'← Portfolio'),sectionTitle(title,t(collection.description)),gallery),dialog);
  } else if (page === 'article') {
    title = article ? t(article.title) : ui('Article unavailable','Beitrag nicht verfügbar');
    const section = el('article',{class:'article wrap interior'},el('a',{class:'back',href:url('news')},'← '+t(pages.news.title)),el('h1',{},title));
    if (article) section.append(image(article.image,true),el('p',{},t(article.body)));
    main.append(section);
  } else {
    const data = pages[page];
    title = t(data.title);
    const section = el('section',{class:'wrap interior'});
    if (data.image) {
      section.append(el('div',{class:'editorial'},el('div',{},sectionTitle(title,t(data.intro)),el('h2',{},t(data.sub)),el('p',{},t(data.body)),link(page === 'services' ? 'contact' : 'portfolio',page === 'services' ? t(pages.contact.title) : t(pages.portfolio.title),'text-link')),image(data.image,true)));
    } else {
      section.append(sectionTitle(title,t(data.intro)));
      if (page === 'portfolio') section.append(previews(false));
      if (page === 'contact') section.append(el('div',{class:'contact-email'},email()));
      if (page === 'news') articles.slice().sort((a,b)=>b.date.localeCompare(a.date)).forEach(item => {
        const date = new Intl.DateTimeFormat(language,{dateStyle:'long',timeZone:'UTC'}).format(new Date(item.date));
        section.append(el('a',{class:'news-entry',href:url('article',{id:item.id})},image(item.image),el('div',{},el('time',{datetime:item.date},date),el('h2',{},t(item.title),arrow(true)),el('p',{},t(item.excerpt)))));
      });
    }
    main.append(section);
  }
  document.title = title + ' · ' + settings.artist;
}
render().catch(error => {
  console.error(error);
  main.textContent = ui('The catalogue could not be loaded. Please reload the page.','Der Katalog konnte nicht geladen werden. Bitte laden Sie die Seite erneut.');
});
