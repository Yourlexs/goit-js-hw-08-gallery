import imagesForGallary from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const divModalEl = document.querySelector('.js-lightbox');
const backdrop = document.querySelector('.lightbox__overlay')
const openModalImg = document.querySelector('.lightbox__image');
const modalButton = document.querySelector('button[data-action="close-lightbox"]');

const imgEl = createGallaryMarkup(imagesForGallary);

galleryEl.insertAdjacentHTML('afterbegin', imgEl);

galleryEl.addEventListener('click', onOpenModalImgClick);

modalButton.addEventListener('click', onCloseModalClick);
backdrop.addEventListener('click', onCloseModalClick);
document.addEventListener('keydown', onCloseModalEsc);

function createGallaryMarkup(images) {
  return images.map(image => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`
  }).join('')
}

function onOpenModalImgClick(event) {
    event.preventDefault();

    const isImgEl = event.target.classList.contains('gallery__image');

    if (!isImgEl) { return; }

    divModalEl.classList.add('is-open');

    changeUrlModalImg(event);
}

function onCloseModalClick(event) {
    deleteUrlModalimg();
    if (event.currentTarget === event.target) {
        divModalEl.classList.remove('is-open');
    };
}

function onCloseModalEsc(event) {
    deleteUrlModalimg();
    if (event.code === 'Escape') { divModalEl.classList.remove('is-open'); }
}

function changeUrlModalImg(event) {
    const newSrc = event.target.getAttribute('data-source');
    openModalImg.src = newSrc;
}

function deleteUrlModalimg() {
    openModalImg.removeAttribute('src');
}
