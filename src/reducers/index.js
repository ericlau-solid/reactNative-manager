import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeAddFormReducer from './EmployeeAddFormReducer';
import EmployeesReducer from './EmployeesReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeAddForm: EmployeeAddFormReducer,
  employees: EmployeesReducer,
});
