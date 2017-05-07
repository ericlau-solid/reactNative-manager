import { 
  EMPLOYEES_GET_SUCCESS
} from '../actions/types';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEES_GET_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
