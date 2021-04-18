import imagesForGallary from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const divModalEl = document.querySelector('.js-lightbox');
const backdrop = document.querySelector('.lightbox__overlay')
const openModalImg = document.querySelector('.lightbox__image');
const modalButton = document.querySelector('button[data-action="close-lightbox"]');

const imagesEl = createGallaryMarkup(imagesForGallary);

galleryEl.insertAdjacentHTML('afterbegin', imagesEl);

galleryEl.addEventListener('click', onOpenModalImgClick);

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

    const newSrc = event.target.getAttribute('data-source');
    openModalImg.src = newSrc;

    modalButton.addEventListener('click', onCloseModalClick);
    backdrop.addEventListener('click', onCloseModalClick);
    document.addEventListener('keydown', onCloseModalEsc);
}

function onCloseModalClick() {
    openModalImg.removeAttribute('src');
  
    divModalEl.classList.remove('is-open');

    modalButton.removeEventListener('click', onCloseModalClick);
    backdrop.removeEventListener('click', onCloseModalClick);
}

function onCloseModalEsc(event) {
  if (event.code === 'Escape') {
    onCloseModalClick(event);
    document.removeEventListener('keydown', onCloseModalEsc);
  };
}

