import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  EMPLOYEE_UPDATE, 
  EMPLOYEE_ADD_FAIL, EMPLOYEE_ADD_START, EMPLOYEE_ADD_SUCCESS,
  EMPLOYEES_GET_SUCCESS, 
} from './types';

export const employeeUpdate = ({ prop, value }) => ({
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  }
);

const employeeAddSuccess = (dispatch, payload) => {
  dispatch({
    type: EMPLOYEE_ADD_SUCCESS,
    payload,
  });
};

const employeeAddFail = (dispatch, error) => {
  dispatch({
    type: EMPLOYEE_ADD_FAIL,
    payload: error,
  });
};

export const employeeAddToStorage = ({ name, phone, shift }) => (
  async dispatch => {
    dispatch({ type: EMPLOYEE_ADD_START });
    const { currentUser } = firebase.auth();
    try {
      const result = await firebase.database().ref(`/users/${currentUser.uid}/employees`).push(
        { name, phone, shift }
      );
      employeeAddSuccess(dispatch, result);
      Actions.employeeList({ type: 'reset' });
    } catch (error) {
      dispatch(employeeAddFail, error);
    }
  }
);

const getEmployeesSuccess = (dispatch, payload, meta) => {
  dispatch({
    type: EMPLOYEES_GET_SUCCESS,
    payload, 
    meta,
  });
};

export const getEmployees = () => (
  dispatch => {
    // websocket establish here. Call once and for app lifetime, 
    // changes in employees will cause action dispatch
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        getEmployeesSuccess(dispatch, snapshot.val(), snapshot);
      });
  }
);
