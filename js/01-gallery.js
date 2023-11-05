import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const pictureContainer = document.querySelector('.gallery')
const pictureMarkup = createPicturesMarkup(galleryItems)

function createPicturesMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}">
        <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
        />
    </a>
    </li>
        `
    }).join('');
}

pictureContainer.insertAdjacentHTML('beforeend', pictureMarkup)

pictureContainer.addEventListener('click', onPictureContainerClick)
 
function onPictureContainerClick(event) {
    event.preventDefault();
  
    if (event.target.nodeName === "IMG") {
            const largeImageURL = event.target.dataset.source;
            openModal(largeImageURL);
        }

}


function openModal(imageURL) {
    const modal = basicLightbox.create(`
        <img src="${imageURL}" />
    `, {
        onShow: function (instance) {
            document.addEventListener('keydown', onEscapeClick);
        },
        onClose: function (instance) {
            document.removeEventListener('keydown', onEscapeClick);
        },
    });

    modal.show();

    function onEscapeClick(event) {
        if (event.key === 'Escape') {
            modal.close();
        }
    }
}



