import { ItemActionTypes } from '../../actions/Item';

function item(state = {}, action) {
  switch (action.type) {
    case ItemActionTypes.SET_NAME:
      return {
        ...state,
        name: action.name,
      };

    case ItemActionTypes.SET_SHOW_IN_GALLERY:
      return {
        ...state,
        show_in_gallery: action.show_in_gallery,
      };

    default:
      return state;
  }
}

export default item;