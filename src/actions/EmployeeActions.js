import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { text as sendTextMessage } from 'react-native-communications';
import moment from 'moment';
import { 
  EMPLOYEE_UPDATE, 
  EMPLOYEE_ADD_FAIL, EMPLOYEE_ADD_START, EMPLOYEE_ADD_SUCCESS,
  EMPLOYEE_SAVE_FAIL, EMPLOYEE_SAVE_START, EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEES_GET_SUCCESS, EMPLOYEE_BOOTSTRAP_FORM
} from './types';

export const employeeUpdate = ({ prop, value }) => ({
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  }
);

export const employeeBootstrapForm = employee => ({
  type: EMPLOYEE_BOOTSTRAP_FORM,
  payload: employee
});

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

export const employeeUpdateStorage = ({ name, phone, shift, uid }) => (
  async dispatch => {
    dispatch({ type: EMPLOYEE_SAVE_START });
    const { currentUser } = firebase.auth();
    try {
      const result = await firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set(
        { name, phone, shift }
      );
      employeeUpdateStorageSuccess(dispatch, result);
      Actions.employeeList({ type: 'reset' });
    } catch (error) {
      dispatch(employeeUpdateStorageFail, error);
    }
  }
);

const employeeUpdateStorageSuccess = (dispatch, payload) => {
  dispatch({
    type: EMPLOYEE_SAVE_SUCCESS,
    payload,
  });
};

const employeeUpdateStorageFail = (dispatch, error) => {
  dispatch({
    type: EMPLOYEE_SAVE_FAIL,
    payload: error,
  });
};

export const sendText = ({ phone, shift }) => (
  () => {
    const weekDay = moment().isoWeekday(shift).format('dddd');
    sendTextMessage(phone, `Your upcoming shift is on ${weekDay}`);
  }
);

