export const ItemActionTypes = {
  SET_NAME: 'SET_NAME',
  SET_SHOW_IN_GALLERY: 'SET_SHOW_IN_GALLERY',
};

export const setName = (name) => ({
  type: ItemActionTypes.SET_NAME,
  name,
});

export const setShowInGallery = (show_in_gallery) => ({
  type: ItemActionTypes.SET_SHOW_IN_GALLERY,
  show_in_gallery,
});