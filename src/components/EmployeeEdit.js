import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Confirm } from './common';
import { employeeBootstrapForm, employeeUpdateStorage, 
  sendText, fireEmployee 
} from '../actions';
import EmployeeForm from './EmployeeForm';

export class EmployeeEditComponent extends Component {
  constructor() {
    super();
    this.state = { showModal: false };
  }

  componentDidMount() {
    this.props.employeeBootstrapForm(this.props.employee);
  }

  handleFireEmployee = () => {
    this.setState({ showModal: !this.state.showModal });
    this.props.fireEmployee(this.props.employee.uid);
  }

  renderButton = () => {
    const { name, phone, shift, saving, employee } = this.props;
    if (saving) {
      return <Spinner size="large" />;
    } 

    return (
      <Button 
        onPress={() => this.props.employeeUpdateStorage(
          { name, phone, shift, uid: employee.uid }
        )}
      >
        Save
      </Button>
    );
  }

  render() {
    const { phone, shift } = this.props;
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          <Button onPress={() => { this.props.sendText({ phone, shift }); }}>
            Text Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.handleFireEmployee}>
            Fire Employee
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
        >
          Are you sure you want to fire employee?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift, saving } = employeeForm;
  return { name, phone, shift, saving };
};

export default connect(mapStateToProps, {
  employeeBootstrapForm, employeeUpdateStorage, sendText, fireEmployee
})(EmployeeEditComponent);
