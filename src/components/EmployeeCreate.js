import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { employeeUpdate, employeeAddToStorage } from '../actions';
import EmployeeForm from './EmployeeForm';

export class EmployeeCreateComponent extends Component {
  renderButton = () => {
    const { name, phone, shift, saving, } = this.props;
    if (saving) {
      return <Spinner size="large" />;
    } 

    return (
      <Button onPress={() => this.props.employeeAddToStorage({ name, phone, shift })}>
        Add
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          {this.renderButton()}
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
  employeeUpdate, employeeAddToStorage,
})(EmployeeCreateComponent);
