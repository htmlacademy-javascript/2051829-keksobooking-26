const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const uploadHousePicElement = document.querySelector('#images');
const housePicPreviewParrentElement = document.querySelector('.ad-form__photo');

const onAvatarPhotoAdd = () => {
  const file = avatarFileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
};

const onHousePhotoAdd = () => {
  const file = uploadHousePicElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const createImgElement = document.createElement('img');
    createImgElement.style.width = '70px';
    createImgElement.style.height = '70px';
    createImgElement.style.alt = 'Фотография жилья';
    createImgElement.src = URL.createObjectURL(file);
    housePicPreviewParrentElement.append(createImgElement);
  }
};

const initUploadAvatar = () => {
  avatarFileChooserElement.addEventListener('change', onAvatarPhotoAdd);
};

const initUploadHousePic = () => {
  uploadHousePicElement.addEventListener('change', onHousePhotoAdd);
};

const resetHousePreviews = () => {
  housePicPreviewParrentElement.textContent = '';
  housePicPreviewParrentElement.files = [];
  avatarPreviewElement.src = '../../img/muffin-grey.svg';
  avatarPreviewElement.files = [];
};

export { initUploadAvatar, initUploadHousePic, resetHousePreviews };
