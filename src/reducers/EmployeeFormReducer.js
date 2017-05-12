import { 
  EMPLOYEE_UPDATE,
  EMPLOYEE_ADD_SUCCESS,
  EMPLOYEE_ADD_START,
  EMPLOYEE_BOOTSTRAP_FORM,
  EMPLOYEE_SAVE_SUCCESS,
} from '../actions/types';

const initialState = {
  name: '',
  phone: '',
  // default monday - iso day of week
  shift: '1',
  saving: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE: {
      return { ...state, [action.payload.prop]: action.payload.value };
    }
    case EMPLOYEE_BOOTSTRAP_FORM: {
      const result = Object.assign({}, initialState, action.payload);
      return result;
    }
    case EMPLOYEE_ADD_START: {
      return { ...state, saving: true };
    }
    case EMPLOYEE_ADD_SUCCESS:
    case EMPLOYEE_SAVE_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
