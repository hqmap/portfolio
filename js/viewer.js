import {el, picture, text, ui} from './content.js';

const ZOOM_SCALE = 1.3;
const DRAG_THRESHOLD = 7;
const SWIPE_THRESHOLD = 60;

export function createViewer(works, caption) {
  const close = el('button', {type: 'button', autofocus: ''}, ui('Close', 'Schließen'), ' ×');
  const prev = el('button', {type: 'button', 'aria-label': ui('Previous work', 'Vorheriges Werk')}, '←');
  const next = el('button', {type: 'button', 'aria-label': ui('Next work', 'Nächstes Werk')}, '→');
  const zoom = el('button', {
    type: 'button', class: 'viewer-image', 'aria-label': ui('Zoom artwork', 'Werk vergrößern'),
    'aria-pressed': 'false', hidden: ''
  });
  const viewport = el('div', {class: 'viewer-viewport'}, zoom);
  const hasSteps = works.length > 1;
  const steps = hasSteps ? el('div', {class: 'steps'}, prev, next) : null;
  const stage = el('figure', {class: 'viewer-stage'}, viewport, steps);
  const status = el('span', {class: 'visually-hidden', 'aria-live': 'polite'});
  const dialog = el('dialog', {class: 'viewer', 'aria-label': ui('Artwork viewer', 'Werkansicht')},
    el('div', {class: 'viewer-controls'}, close), stage, status
  );

  let opener;
  let current = 0;
  let image;
  let details;
  let fitted;
  let position;
  let zoomed = false;
  let pointer;

  function place(left, top) {
    const scale = zoomed ? ZOOM_SCALE : 1;
    const width = fitted.width * scale;
    const height = fitted.height * scale;
    const {viewWidth, viewHeight} = fitted;
    const clamp = (offset, size, available) => size > available
      ? Math.min(0, Math.max(available - size, offset)) : (available - size) / 2;
    position = {left: clamp(left, width, viewWidth), top: clamp(top, height, viewHeight)};
    // Narrow portrait layouts can place the caption just below the fitted image.
    details?.style.setProperty('--caption-offset', `${Math.min(0, position.top + height - viewHeight)}px`);
    Object.assign(zoom.style, {
      width: `${width}px`, height: `${height}px`,
      left: `${position.left}px`, top: `${position.top}px`
    });
  }

  function fit() {
    if (!dialog.open) return;
    // Allow keyboard scrolling when a caption field reaches its height limit.
    if (details) {
      for (const field of [details, ...details.children]) {
        const scrollable = field.scrollHeight > field.clientHeight && getComputedStyle(field).overflowY === 'auto';
        if (scrollable) field.tabIndex = 0;
        else field.removeAttribute('tabindex');
      }
    }
    if (!image?.naturalWidth || !image.naturalHeight) return;
    const {width: viewWidth, height: viewHeight} = viewport.getBoundingClientRect();
    if (!viewWidth || !viewHeight) return;
    const scale = Math.min(viewWidth / image.naturalWidth, viewHeight / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const left = (viewWidth - width) / 2;
    const top = (viewHeight - height) / 2;
    if (fitted?.viewWidth === viewWidth && fitted.viewHeight === viewHeight) return;
    fitted = {width, height, left, top, viewWidth, viewHeight};
    const zoomScale = zoomed ? ZOOM_SCALE : 1;
    place((viewWidth - width * zoomScale) / 2, (viewHeight - height * zoomScale) / 2);
    zoom.hidden = false;
  }

  function resetInteraction() {
    pointer = undefined;
    zoomed = false;
    fitted = undefined;
    viewport.classList.remove('dragging');
    zoom.setAttribute('aria-pressed', 'false');
  }

  function show(index) {
    current = (index + works.length) % works.length;
    const work = works[current];
    const zoomHasFocus = document.activeElement === zoom;
    status.textContent = '';
    resetInteraction();
    zoom.hidden = !zoomHasFocus;
    zoom.style.opacity = '0';
    details?.remove();
    details = caption(work);
    if (details) stage.append(details);

    const nextImage = picture(work, true);
    nextImage.draggable = false;
    nextImage.id = 'viewer-artwork-image';
    if (nextImage.alt) zoom.setAttribute('aria-describedby', nextImage.id);
    else zoom.removeAttribute('aria-describedby');
    image = nextImage;
    zoom.replaceChildren(image);

    function reveal() {
      if (image !== nextImage) return;
      fit();
      zoom.style.removeProperty('opacity');
    }
    nextImage.addEventListener('load', reveal, {once: true});
    nextImage.addEventListener('error', () => {
      if (image !== nextImage) return;
      zoom.hidden = true;
      status.textContent = ui('Artwork image unavailable.', 'Das Werkbild ist nicht verfügbar.');
    }, {once: true});
    if (nextImage.complete && nextImage.naturalWidth) reveal();
    status.textContent = [ui(`Artwork ${current + 1} of ${works.length}`, `Werk ${current + 1} von ${works.length}`),
      text(work.title) || text(work.alt)].filter(Boolean).join('. ');
  }

  function toggleZoom(clientX, clientY) {
    if (!fitted) return;
    zoomed = !zoomed;
    zoom.setAttribute('aria-pressed', String(zoomed));
    if (!zoomed) {
      place(fitted.left, fitted.top);
      return;
    }

    const bounds = viewport.getBoundingClientRect();
    const x = clientX == null ? fitted.viewWidth / 2 : clientX - bounds.left;
    const y = clientY == null ? fitted.viewHeight / 2 : clientY - bounds.top;
    place(x - (x - fitted.left) * ZOOM_SCALE, y - (y - fitted.top) * ZOOM_SCALE);
  }

  zoom.addEventListener('click', event => {
    // Keyboard and assistive technology activate the button without a pointer gesture.
    if (!event.detail) toggleZoom();
  });

  viewport.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || !fitted) return;
    pointer = {id: event.pointerId, x: event.clientX, y: event.clientY, position,
      dragging: false, startedOnImage: zoom.contains(event.target)};
  });

  viewport.addEventListener('pointermove', event => {
    if (pointer?.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (!pointer.dragging && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    if (!pointer.dragging) {
      pointer.dragging = true;
      viewport.setPointerCapture(event.pointerId);
    }
    if (zoomed) {
      viewport.classList.add('dragging');
      place(pointer.position.left + dx, pointer.position.top + dy);
    }
  });

  viewport.addEventListener('pointerup', event => {
    if (pointer?.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    const tappedImage = !pointer.dragging && pointer.startedOnImage
      && Math.hypot(dx, dy) < DRAG_THRESHOLD && zoom.contains(event.target);
    endDrag();
    if (tappedImage) {
      toggleZoom(event.clientX, event.clientY);
    } else if (!zoomed && hasSteps && event.pointerType !== 'mouse'
        && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      show(current + (dx < 0 ? 1 : -1));
    }
  });

  function endDrag() {
    pointer = undefined;
    viewport.classList.remove('dragging');
  }
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', event => {
    if (event.target === viewport && pointer?.id === event.pointerId) endDrag();
  });

  close.addEventListener('click', () => dialog.close());
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  dialog.addEventListener('close', () => {
    resetInteraction();
    image = undefined;
    zoom.replaceChildren();
    opener?.focus({preventScroll: true});
  });
  dialog.addEventListener('keydown', event => {
    if (!hasSteps || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const previous = event.key === 'ArrowLeft';
      if (details?.contains(event.target)) (previous ? prev : next).focus({preventScroll: true});
      show(current + (previous ? -1 : 1));
    }
  });
  new ResizeObserver(fit).observe(viewport);

  return {
    dialog,
    open(index, trigger) {
      opener = trigger;
      dialog.showModal();
      show(index);
    }
  };
}
