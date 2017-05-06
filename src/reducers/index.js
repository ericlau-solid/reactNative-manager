import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeAddFormReducer from './EmployeeAddFormReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeAddForm: EmployeeAddFormReducer,
});
