import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { employeeBootstrapForm, employeeUpdateStorage, sendText } from '../actions';
import EmployeeForm from './EmployeeForm';

export class EmployeeEditComponent extends Component {
  componentDidMount() {
    this.props.employeeBootstrapForm(this.props.employee);
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
      </Card>
    );
  }
}

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift, saving } = employeeForm;
  return { name, phone, shift, saving };
};

export default connect(mapStateToProps, {
  employeeBootstrapForm, employeeUpdateStorage, sendText
})(EmployeeEditComponent);
