import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_START,
  LOGIN_USER_FAIL,
} from '../actions/types';

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: '',
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED: {
      return { ...state, email: action.payload };
    }
    case PASSWORD_CHANGED: {
      return { ...state, password: action.payload };
    }
    case LOGIN_USER_START: {
      return { ...state, error: '', loading: true };
    }
    case LOGIN_USER_SUCCESS: {
      return { ...state, ...initialState, user: action.payload };
    }
    case LOGIN_USER_FAIL: {
      return { ...state, ...initialState, error: 'Authentication failed', };
    }
    default: {
      return state;
    }
  }
};
